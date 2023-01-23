'use strict'
/**
 * Soubor obsluhuje formular zobrazeniSjednanehoPojisteni.html.
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
 * Otevře formulář s výpisem sjednaného pojištění, nebo vyplní formulář daty příslušného sjednaného pojištění.
 * @param index
 */
function vyplnFormular(index) {

    document.querySelector("#nadpis").innerHTML = `Zobrazit pojištění u
             ${pojistovna._pojistenci[index]._jmeno} ${pojistovna._pojistenci[index]._prijmeni}`;

    document.querySelector("#castka").type = "text";

    document.querySelector("#inputTypPojisteni").value = `${pojistovna._sjednanaPojisteni[sjednanePojisteniID]._typPojisteni}`;
    document.querySelector("#castka").value = `${pojistovna._sjednanaPojisteni[sjednanePojisteniID]._castka} Kč`;
    document.querySelector("#predmetPojisteni").value = `${pojistovna._sjednanaPojisteni[sjednanePojisteniID]._predmetPojisteni}`;
    document.querySelector("#platnostOd").value = `${pojistovna._sjednanaPojisteni[sjednanePojisteniID]._platnostOd}`;
    document.querySelector("#platnostDo").value = `${pojistovna._sjednanaPojisteni[sjednanePojisteniID]._platnostDo}`;
}


