'use strict'
/**
 * Soubor obsluhuje formular sjednaniPojisteni.html. Formulář je pro sjednání nového, nebo editaci stávajícího pojištění
 */

const pojistovna = new PojistovnaAdmin();
let pojistenecID;
let sjednanePojisteniID;

/**
 * Funkce načte z localStorage pojištěnce, typy pojištění a sjednaná pojištění. Vyplní formulář daty příslušného
 * sjednaného pojištění
 */
window.onload = () => {
    pojistovna.nactiPojistence();
    pojistovna.nactiTypyPojisteni();
    pojistovna.nactiSjednanaPojisteni();
    pojistenecID = location.hash.substring(1,2);
    const hashSplit = location.hash.split("%");
    sjednanePojisteniID = -1;
    if (hashSplit[1]) {
        sjednanePojisteniID = hashSplit[1];
    }

    for (let i = 0; i < pojistovna._pojistenci.length; i++) {
        if (pojistenecID == pojistovna._pojistenci[i]._index) {
            vyplnFormular(i);
        }
    }

    /*
     * Nastavení pojištěnce tlačítku zpět
     */
    document.querySelector("#tlacitko-zpet").href += `#${pojistenecID}`;


}

/**
 * Otevře prázdný formulář pro sjednání nového pojištění, nebo vyplní formulář daty příslušného sjednaného pojištění.
 * @param index
 */
function vyplnFormular(index) {

    const selectTypPojisteni = document.querySelector("#typ-pojisteni");
    for (let i = 0; i < pojistovna._typyPojisteni.length; i++) {
        const optionTypPojisteni = document.createElement("option");
        optionTypPojisteni.innerHTML = pojistovna._typyPojisteni[i];
        optionTypPojisteni.value = i;
        selectTypPojisteni.appendChild(optionTypPojisteni);
    }
    if (sjednanePojisteniID == -1) {
        document.querySelector("#nadpis").innerHTML = `Přidat pojištění k
             ${pojistovna._pojistenci[index]._jmeno} ${pojistovna._pojistenci[index]._prijmeni}`;
    } else {
        document.querySelector("#nadpis").innerHTML = `Editovat pojištění u
             ${pojistovna._pojistenci[index]._jmeno} ${pojistovna._pojistenci[index]._prijmeni}`;

        for (let i = 0; i < pojistovna._typyPojisteni.length; i++) {
            if (pojistovna._sjednanaPojisteni[sjednanePojisteniID]._typPojisteni == pojistovna._typyPojisteni[i]) {
                document.querySelector("#typ-pojisteni").value = `${i}`;
            }

        }

        document.querySelector("#castka").value = `${pojistovna._sjednanaPojisteni[sjednanePojisteniID]._castka}`;
        document.querySelector("#predmet-pojisteni").value = `${pojistovna._sjednanaPojisteni[sjednanePojisteniID]._predmetPojisteni}`;
        document.querySelector("#platnost-od").value = `${pojistovna._sjednanaPojisteni[sjednanePojisteniID]._platnostOd}`;
        document.querySelector("#platnost-do").value = `${pojistovna._sjednanaPojisteni[sjednanePojisteniID]._platnostDo}`;
    }
}


/**
 * Zvaliduje formulář a uloží sjednané / editované pojištění
 */
document.querySelector("#sjednani-pojisteni-form").addEventListener("submit", function(event){
    event.preventDefault();

    try {
        if (event.target.elements.typPojisteni.value < 0) {
            throw new Error('Vyberte platný typ pojištění');
        }

        if (event.target.elements.castka.value < 10) {
            throw new Error('Částka pojištění je příliš nízká');
        }

        if (event.target.elements.predmetPojisteni.value.length < 3) {
            throw new Error('Předmět pojištění musí mít aspoň 3 znaky!');
        }

        const sjednanePojisteni = new SjednanaPojisteni();

        if (sjednanePojisteniID == -1) {
            sjednanePojisteni._idPojistence = pojistenecID;
            sjednanePojisteni._typPojisteni = pojistovna._typyPojisteni[event.target.elements.typPojisteni.value];
            sjednanePojisteni._castka = event.target.elements.castka.value;
            sjednanePojisteni._predmetPojisteni = event.target.elements.predmetPojisteni.value;
            sjednanePojisteni._platnostOd = event.target.elements.platnostOd.value;
            sjednanePojisteni._platnostDo = event.target.elements.platnostDo.value;
            pojistovna._sjednanaPojisteni.push(sjednanePojisteni);
        } else {
            pojistovna._sjednanaPojisteni[sjednanePojisteniID]._typPojisteni = pojistovna._typyPojisteni[event.target.elements.typPojisteni.value];
            pojistovna._sjednanaPojisteni[sjednanePojisteniID]._castka = event.target.elements.castka.value;
            pojistovna._sjednanaPojisteni[sjednanePojisteniID]._predmetPojisteni = event.target.elements.predmetPojisteni.value;
            pojistovna._sjednanaPojisteni[sjednanePojisteniID]._platnostOd = event.target.elements.platnostOd.value;
            pojistovna._sjednanaPojisteni[sjednanePojisteniID]._platnostDo = event.target.elements.platnostDo.value;
            window.open(`zobrazeniPojistence.html#${pojistenecID}`);
        }

        pojistovna.ulozSjednanaPojisteni();
        /*vynulovani formulare*/
        document.querySelector("#typ-pojisteni").value = -1;
        document.querySelector("#castka").value = "";
        document.querySelector("#predmet-pojisteni").value = "";
        document.querySelector("#platnost-od").value = "2023-01-01";
        document.querySelector("#platnost-do").value = "2024-12-31";

    }

    catch(err) {
        alert(err);
    }

});