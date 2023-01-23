'use strict'
/**
 * Soubor obsluhuje formular pojistenci.html
 */

let opravneni;

/**
 * funkce načte opravnění z localStorage a nastaví příslušný radiobutton
 */
window.onload = () => {
    const opravneniZeStorage = localStorage.getItem("opravneni");
    const opravneni = JSON.parse(opravneniZeStorage);
    const formular = document.getElementById("nastav-opravneni");
    const moznostiVyberu = formular.children;

    /**
     * Nastaveni checked radiobuttonu dle hodnoty v localStorage
     */
    for (const vybranaMoznost of moznostiVyberu) {
        if (vybranaMoznost.value == opravneni) {
            vybranaMoznost.checked = true;
        }
    }
}

/**
 * Funkce uloží vybrané oprávnění do localStorage a vypíše potvrzující hlášku
 */
document.querySelector("#nastav-opravneni").addEventListener("submit", function (event){
    event.preventDefault();
    const data = new FormData(document.querySelector("#nastav-opravneni"));

    for (const vstup of data) {
        localStorage.setItem("opravneni", JSON.stringify(vstup[1]));
    }

    let hlaska = document.createElement("p");
    hlaska.innerHTML  = "oprávnění bylo nastaveno";
    hlaska.setAttribute("style","font-size: 0.7rem");
    document.querySelector("article").appendChild(hlaska);
    setTimeout(() => {
        document.querySelector("article").removeChild(hlaska);
    }, "1000")
});

