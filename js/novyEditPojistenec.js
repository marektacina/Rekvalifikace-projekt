'use strict'

/**
 * Soubor obsluhuje formulář pro vytvoření nebo editaci pojištěnce
 */
const pojistovna = new PojistovnaAgent();
let pojistenecID;

/**
 * Pokud je v hash předán ID pojištěnce, formulář se otevře v módu editace a je možno upravit hodnoty pojištěnce.
 * Pokud je předána -1, form se otevře v módu vytvoření nového pojištěnce
 */
window.onload = () => {
    pojistovna.nactiPojistence();
    pojistenecID = location.hash.substring(1);
    if (pojistenecID > -1) {
        document.querySelector(".nadpis").innerText = "Edituj pojištěnce";
        vyplnFormular();
    }
}

/**
 * Formulář vyplní údaje o pojištěnci v módu editace
 */
function vyplnFormular() {
    for (const pojistenec of pojistovna.pojistenci) {
        if (pojistenecID == pojistenec._index) {
            document.querySelector("#jmeno").value = pojistenec._jmeno;
            document.querySelector("#prijmeni").value = pojistenec._prijmeni;
            document.querySelector("#email").value = pojistenec._email;
            document.querySelector("#telefon").value = pojistenec._telefon;
            document.querySelector("#adresa").value = pojistenec._adresa;
            document.querySelector("#mesto").value = pojistenec._mesto;
            document.querySelector("#psc").value = pojistenec._psc;
        }
    }
}

/**
 * Validace předaných dat a uložení nového/editovaného pojištěnce.
 * */
document.querySelector("#novy-pojistenec-form").addEventListener("submit", function(event){
    event.preventDefault();

    try {
        if (event.target.elements.jmeno.value.length < 2) {
            throw new Error('Jméno musí mít aspoň 2 znaky!');
        }

        if (event.target.elements.prijmeni.value.length < 2) {
            throw new Error('Příjmeni musí mít aspoň 2 znaky!');
        }

        if (!event.target.elements.email.value) {
            throw new Error('Doplňte emailovou adresu');
        }

        if (event.target.elements.telefon.value.length != 9) {
            throw new Error('Zadejte telefonní číslo bez předčíslí');
        }

        if (event.target.elements.prijmeni.value.length < 2) {
            throw new Error('Příjmeni musí mít aspoň 2 znaky!');
        }

        if (event.target.elements.adresa.value.length < 3) {
            throw new Error('Nesprávný formát ulice!');
        }

        if (event.target.elements.mesto.value.length < 3) {
            throw new Error('Nesprávný formát města!');
        }

        if (event.target.elements.psc.value.length != 5) {
            throw new Error('Nesprávný formát psc');
        }

        let pojistenec = new Pojistenec();
        pojistenec.jmeno = event.target.elements.jmeno.value;
        pojistenec.prijmeni = event.target.elements.prijmeni.value;
        pojistenec.email = event.target.elements.email.value;
        pojistenec.telefon = event.target.elements.telefon.value;
        pojistenec.adresa = event.target.elements.adresa.value;
        pojistenec.mesto = event.target.elements.mesto.value;
        pojistenec.psc = event.target.elements.psc.value;

        /*
         * Pokud je nový pojištěnec, zápis jako nový prvek v poli, jinak editace
         */
        if (pojistenecID == -1) {
            pojistenec.index = pojistovna.vratPosledniIndex() + 1;
            pojistovna.pridejPojistence(pojistenec);
        } else {
            pojistenec.index = pojistenecID;
            pojistovna.aktualizujPojistence(pojistenec);
        }
        pojistovna.ulozPojistence();

        /*
        *  Pokud je editovaný pojistenec, přejde na formulář pojistenci.html, u nového ne, aby bylo možno vkládat
        *  další pojištěnce
         */
        if (pojistenecID > -1) {
            open("pojistenci.html");
        }

        /*
        * Zobrazení hlášky na 2 sec po uložení pojištěnce
         */
        let hlaska = document.getElementById("byl-ulozen");

        hlaska.setAttribute("style","color: black");
        setTimeout(() => {
            hlaska.setAttribute("style","color: white");
        }, "2000")

        /*
        * vynulování formuláře po uložení pojištěnce
         */
        event.target.elements.jmeno.value = "";
        event.target.elements.prijmeni.value = "";
        event.target.elements.email.value = "";
        event.target.elements.telefon.value = "";
        event.target.elements.adresa.value = "";
        event.target.elements.mesto.value = "";
        event.target.elements.psc.value = "";
    }

    catch(err) {
        alert(err);
    }

});
