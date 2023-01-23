'use strict'
/**
 * Obsluhuje formulář pro zobrazení pojištěnce včetně sjednaných pojištění
 */

let pojistovna = null;
let pojistenecID;

/**
 * Načte oprávnění z localStorage, pojištěnce i sjednaná pojištění. Zavolá funkce pro vypsání údajů do formuláře
 */
window.onload = () => {
    const opravneniZeStorage = localStorage.getItem("opravneni");
    const opravneni = JSON.parse(opravneniZeStorage);

    if (opravneni == "agent") {
        pojistovna = new PojistovnaAgent();
    } else if (opravneni == "admin") {
        pojistovna = new PojistovnaAdmin();
        pojistovna.nactiTypyPojisteni();
    }
    else {
        pojistovna = new Pojistovna();
    }

    pojistovna.nactiPojistence();
    pojistovna.nactiSjednanaPojisteni();
    pojistenecID = location.hash.substring(1);
    vyplnUdaje();
    vypisSjednanaPojisteni();
    vypisTlacitka();
}

/**
 * Vypíše informace o pojištěnci do formuláře
 */
function vyplnUdaje() {
    for (const pojistenec of pojistovna.pojistenci) {
        if (pojistenecID == pojistenec._index) {
            document.querySelector("#jmeno").innerHTML = `${pojistenec._jmeno} ${pojistenec._prijmeni}`;
            document.querySelector("#ulice").innerHTML = pojistenec._adresa;
            document.querySelector("#mesto").innerHTML = pojistenec._mesto;
            document.querySelector("#psc").innerHTML = `${pojistenec._psc.substring(0,3)} ${pojistenec._psc.substring(3,5)}`;
            document.querySelector("#email").innerHTML = pojistenec._email;
            document.querySelector("#telefon").innerHTML = `${pojistenec._telefon.substring(0,3)} ${pojistenec._telefon.substring(3,6)} ${pojistenec._telefon.substring(6,9)}`;
        }
    }
}

/**
 * Vypíše tabulku se sjednanými pojištěními do formuláře
 */
function vypisSjednanaPojisteni() {
    let sjednanePojisteni = false;

    const sekceSjednanaPojisteni = document.querySelector("#sjednana-pojisteni");
    sekceSjednanaPojisteni.innerHTML = "";

    const nadpisTabulky = document.createElement("p");
    nadpisTabulky.innerHTML = "Sjednaná pojištění";
    nadpisTabulky.id="nadpis-tabulky";
    sekceSjednanaPojisteni.appendChild(nadpisTabulky);

    const hlavickaTabulky = document.createElement("thead");
    const bunkaHlavickyTabulkyPojisteni = document.createElement("td");
    const bunkaHlavickyTabulkyCastka = document.createElement("td");
    const bunkaHlavickyTabulkyPrazdna = document.createElement("td");

    bunkaHlavickyTabulkyPojisteni.innerHTML = "Pojištění";
    bunkaHlavickyTabulkyCastka.innerHTML = "Částka";
    bunkaHlavickyTabulkyPrazdna.innerHTML = "";

    hlavickaTabulky.appendChild(bunkaHlavickyTabulkyPojisteni);
    hlavickaTabulky.appendChild(bunkaHlavickyTabulkyCastka);
    hlavickaTabulky.appendChild(bunkaHlavickyTabulkyPrazdna);

    const tabulka = document.createElement("table");
    tabulka.appendChild(hlavickaTabulky);


    for (let i = 0; i < pojistovna._sjednanaPojisteni.length; i++) {
        if (pojistovna._sjednanaPojisteni[i]._idPojistence == pojistenecID) {
            const radekTabulky = document.createElement("tr");
            const bunkaTabulkyPojisteni = document.createElement("td");
            const bunkaTabulkyCastka = document.createElement("td");
            const bunkaTabulkyTlacitka = document.createElement("td");

            bunkaTabulkyCastka.setAttribute("style", "text-align: right");
            bunkaTabulkyPojisteni.innerHTML = `<a class="pojisteni-v-tabulce" href=zobrazeniSjednanehoPojisteni.html#${pojistenecID}%${i}\>${pojistovna._sjednanaPojisteni[i]._typPojisteni}</a>`;
            bunkaTabulkyCastka.innerHTML = `${pojistovna._sjednanaPojisteni[i]._castka} Kč`;

            const tlacitkoSmaz = document.createElement("a");
            tlacitkoSmaz.className = "tlacitko-smaz tlacitko-smaz-pojisteni";
            tlacitkoSmaz.innerHTML = "Smaž";
            tlacitkoSmaz.id = i;
            tlacitkoSmaz.onclick = () => {
                pojistovna.smazSjednanePojisteni(tlacitkoSmaz.id);
                vypisSjednanaPojisteni();
            };
            const tlacitkoEdituj = document.createElement("a");
            tlacitkoEdituj.className = "tlacitko-edituj tlacitko-edituj-pojisteni";
            tlacitkoEdituj.innerHTML = "Edituj";
            tlacitkoEdituj.setAttribute("href", `sjednaniPojisteni.html#${pojistenecID}%${i}`);
            bunkaTabulkyTlacitka.appendChild(tlacitkoSmaz);
            bunkaTabulkyTlacitka.appendChild(tlacitkoEdituj);
            bunkaTabulkyTlacitka.className = "bunka-tlacitka";

            radekTabulky.appendChild(bunkaTabulkyPojisteni);
            radekTabulky.appendChild(bunkaTabulkyCastka);
            radekTabulky.appendChild(bunkaTabulkyTlacitka);

            tabulka.appendChild(radekTabulky);
            sjednanePojisteni = true;
        }
    }
    if (!sjednanePojisteni) {
        nadpisTabulky.innerHTML = "Pojištěnec ještě nemá sjednané žádné pojištění";
    } else {
        sekceSjednanaPojisteni.appendChild(tabulka);
    }

}

/**
 * Vykreslí pod tabulku tlačítka pro přidání pojištění, editaci a smazání pojištěnce
 */
function vypisTlacitka() {
    const sekceSTlacitky = document.querySelector("#tlacitka");

    const tlacitkoPridat = document.createElement("a");
    const tlacitkoEditovat = document.createElement("a");
    const tlacitkoOdstranit = document.createElement("a");
    tlacitkoPridat.innerHTML = "Přidat pojištění";
    tlacitkoEditovat.innerHTML = "Editovat pojištěnce";
    tlacitkoOdstranit.innerHTML = "Odstranit pojištěnce";

    tlacitkoPridat.className = "tlacitko-edituj tlacitko-pridat";
    tlacitkoEditovat.className = "tlacitko-edituj";
    tlacitkoEditovat.setAttribute("href", `novyEditPojistenec.html#${pojistenecID}`);
    tlacitkoOdstranit.className = "tlacitko-smaz";
    tlacitkoOdstranit.onclick = () => {
        if (pojistovna.smazPojistence(pojistenecID)) {
            window.open("pojistenci.html");
        }
    };
    tlacitkoPridat.href="sjednaniPojisteni.html#" + `${pojistenecID}`;

    sekceSTlacitky.appendChild(tlacitkoPridat);
    sekceSTlacitky.appendChild(tlacitkoEditovat);
    sekceSTlacitky.appendChild(tlacitkoOdstranit);
}