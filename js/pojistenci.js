'use strict'

/**
 * Soubor obsluhuje formular pojistenci.html
 */

/**
 * Funkce po nacteni dokumentu nacte opravneni z localStorage, vytvori tridu pojistovny dle opravneni a zavola
 * funkci pro nacteni a vypis pojistencu
 */
 window.onload = () => {
    let pojistovna = null;
    const opravneniZeStorage = localStorage.getItem("opravneni");
    const opravneni = JSON.parse(opravneniZeStorage);

    if (opravneni == "agent") {
        pojistovna = new PojistovnaAgent();
        pojistovna.nactiPojistence();
    } else if (opravneni == "admin") {
        pojistovna = new PojistovnaAdmin();
        pojistovna.nactiPojistence();
    }
    else {
        pojistovna = new Pojistovna();
    }
    pojistovna.vypisPojistencu();
}





