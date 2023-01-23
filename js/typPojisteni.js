'use strict'

/**
 * Obsluhuje formulář pro vložení nového nebo odstranění typu pojištění
 * 
 */
window.onload = () => {

    let pojistovna = null;
    const opravneniZeStorage = localStorage.getItem("opravneni");
    const opravneni = JSON.parse(opravneniZeStorage);

    if (opravneni == "agent") {
        pojistovna = new PojistovnaAgent();
    } else if (opravneni == "admin") {
        pojistovna = new PojistovnaAdmin();
        pojistovna.nactiTypyPojisteni();
        document.querySelector("#typy-pojisteni").addEventListener("submit", (event) => {
            event.preventDefault();
            pojistovna.vlozTypPojisteni(event);
        });
    }
    else {
        pojistovna = new Pojistovna();
    }

    pojistovna.vypisTypyPojisteni();

}

