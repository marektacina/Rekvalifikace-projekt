'use strict'

/**
 * Rozšíření třídy Pojistovna se použivá pro výpis údajů dle oprávnění admina
 */
class PojistovnaAdmin extends PojistovnaAgent {
    /**
     * Funkce vloží typ pojištění do databáze
     * @param event {Event} obsahuje odkaz na input, z kterého se použije typ pojištění
     */
    vlozTypPojisteni(event) {
            try {
                if (event.target.elements.typPojisteni.value.length < 3) {
                    throw new Error('Typ pojištění musí mít aspoň 3 znaky!');
                }
                this._typyPojisteni.push(event.target.elements.typPojisteni.value);
                event.target.elements.typPojisteni.value = "";
                this.ulozTypyPojisteni();
                this.vypisTypyPojisteni();
            } catch (err) {
                alert(err);
            }
    }

    /**
     * Vypíše typy pojištění do stránky
     */
    vypisTypyPojisteni() {
        this.nactiTypyPojisteni();
        const odstavecSTabulkou = document.querySelector("#vypis-pojisteni");
        odstavecSTabulkou.innerHTML="";

        if (this._typyPojisteni.length == 0) {
            const hlaska = document.createElement("p");
            hlaska.innerText = "Nejsou navedena žádná pojištění";
            odstavecSTabulkou.appendChild(hlaska);
        } else {
            const tabulka = document.createElement("table");
            const radekHlavicky = document.createElement("thead");
            const bunkaHlavicky = document.createElement("td");
            const bunkaHlavickySmaz = document.createElement("td");

            bunkaHlavicky.innerText = "Typy pojištění:";
            radekHlavicky.appendChild(bunkaHlavicky);
            radekHlavicky.appendChild(bunkaHlavickySmaz);
            tabulka.appendChild(radekHlavicky);

            for (let i = 0; i < this._typyPojisteni.length; i++) {
                const radekTabulky = document.createElement("tr");
                const bunkaTabulky = document.createElement("td");
                bunkaTabulky.innerText = this._typyPojisteni[i];
                radekTabulky.appendChild(bunkaTabulky);

                const tlacitkoSmaz = document.createElement("a");
                tlacitkoSmaz.className = "tlacitko-smaz";
                tlacitkoSmaz.innerHTML = "Smaž";
                tlacitkoSmaz.id = i;

                tlacitkoSmaz.onclick = () => {
                    if (this.smazTypPojisteni(i)) {
                        this.ulozTypyPojisteni();
                        this.vypisTypyPojisteni();
                    }
                };

                const bunkaTabulkySmaz = document.createElement("td");
                bunkaTabulkySmaz.appendChild(tlacitkoSmaz);
                bunkaTabulkySmaz.className = "centruj";
                radekTabulky.appendChild(bunkaTabulky);
                radekTabulky.appendChild(bunkaTabulkySmaz);

                tabulka.appendChild(radekTabulky);
            }
            odstavecSTabulkou.appendChild(tabulka);


        }
    }

    /**
     * Načte typy pojištění z localStorage
     */
    nactiTypyPojisteni() {
        const typyPojisteniZeStorage = localStorage.getItem("typyPojisteni");
        this._typyPojisteni = typyPojisteniZeStorage ? JSON.parse(typyPojisteniZeStorage) : [];
    }

    /**
     * Uloží typy pojištění z localStorage
     */
    ulozTypyPojisteni() {
        localStorage.setItem("typyPojisteni", JSON.stringify(this._typyPojisteni));
    }
}