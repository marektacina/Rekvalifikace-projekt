'use strict'

/**
 * Rozšíření třídy Pojistovna se použivá pro výpis údajů dle oprávnění agenta
 */

class PojistovnaAgent extends Pojistovna {
    _pojistenci = [];
    _typyPojisteni = [];
    _sjednanaPojisteni = [];


    get pojistenci() {
        return this._pojistenci;
    }

    /**
     * Prida pojištěnce do pole pojištěnců
     * @param pojistenec {Pojistenec} objekt pojištěnce pro přidání k poli pojištěnců
     */
    pridejPojistence(pojistenec) {
        this._pojistenci.push(pojistenec);
    }

    /**
     * aktualizuje pojištěnce
     * @param zmenenyPojistenec {Pojistenec} objekt pojištěnce se změněnými parametry
     */
    aktualizujPojistence(zmenenyPojistenec) {
        for (const pojistenec of pojistovna._pojistenci) {
            if (pojistenec._index == zmenenyPojistenec._index) {
                pojistenec._jmeno = zmenenyPojistenec._jmeno;
                pojistenec._prijmeni = zmenenyPojistenec._prijmeni;
                pojistenec._email = zmenenyPojistenec._email;
                pojistenec._telefon = zmenenyPojistenec._telefon;
                pojistenec._adresa = zmenenyPojistenec._adresa;
                pojistenec._mesto = zmenenyPojistenec._mesto;
                pojistenec._psc = zmenenyPojistenec._psc;
            }
        }
    }

    /**
     * Ulozi pojistence do localStorage
     */
    ulozPojistence() {
        localStorage.setItem("pojistenci", JSON.stringify(this._pojistenci));
    }

    /**
     * Nacte pojistence z localStorage
     */
    nactiPojistence() {
        const pojistenciZeStorage = localStorage.getItem("pojistenci");
        this._pojistenci = pojistenciZeStorage ? JSON.parse(pojistenciZeStorage) : [];
    }


    /**
     * Načte sjednaná pojištění z localStorage
     */
    nactiSjednanaPojisteni() {
        const sjednanaPojisteniZeStorage = localStorage.getItem("sjednanaPojisteni");
        this._sjednanaPojisteni = sjednanaPojisteniZeStorage ? JSON.parse(sjednanaPojisteniZeStorage) : [];
    }

    /**
     * Uloží sjednaná pojištění do localStorage
     */
    ulozSjednanaPojisteni() {
        localStorage.setItem("sjednanaPojisteni", JSON.stringify(this._sjednanaPojisteni));
    }

    /**
     * Smaže sjednané pojištění. Vrátí true/false
     * @param index {number} index sjednaného pojištění pro smazání
     * @returns {boolean} vrací potvrzení zdaru smazání sjednaného pojištění
     */
    smazSjednanePojisteni(index) {
        if (confirm("Opravdu chcete smazat sjednané pojištění?")) {
            this._sjednanaPojisteni.splice(index, 1);
            this.ulozSjednanaPojisteni();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Smaže typ pojištění
     * @param index {number} index typu pojištění pro smazání
     * @returns {boolean} vrací potvrzení zdaru smazání typu pojištění
     */
    smazTypPojisteni(index) {

        if (confirm("Opravdu chcete smazat typ pojištění?")) {
            this.nactiSjednanaPojisteni();
            this.nactiTypyPojisteni();

            for (const sjednanePojisteni of this._sjednanaPojisteni) {
                if (this._typyPojisteni[index] == sjednanePojisteni._typPojisteni) {
                    alert("Pojištění je sjednané, a tak nejde vymazat");
                    return false;
                }
            }
            this._typyPojisteni.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Funkce vrátí počet pojištěnců v databázi
     * @returns {number}
     */
    vratPocetPojistencu() {
        return this._pojistenci.length;
    }

    /**
     * Funkce vrátí index posledního pojištěnce. Pokud je databáze prázdná, vrátí 0
     * @returns {number}
     */
    vratPosledniIndex() {
        if (!this._pojistenci.length) {
            return 0;
        } else {
            return this._pojistenci[this._pojistenci.length - 1]._index;
        }
    }

    /**
     * Funkce vypise pojistence do dokumentu
     */
    vypisPojistencu() {
        const odstavecSTlacitkem = document.querySelector("#novy-pojistenec");
        odstavecSTlacitkem.innerHTML = "";
        let tlacitkoNovy = document.createElement("a");
        tlacitkoNovy.href = "novyEditPojistenec.html#-1";
        tlacitkoNovy.className = "tlacitko tlacitko-novy";
        tlacitkoNovy.innerText = "Nový pojištěnec";
        odstavecSTlacitkem.appendChild(tlacitkoNovy);

        const sekceSPojistenci = document.getElementById("pojistenci");
        sekceSPojistenci.innerHTML="";

        if (!this.vratPocetPojistencu()) {
            const vypis = document.createElement("p");
            vypis.innerHTML = "Databáze pojištěnců je prázdná";
            vypis.className = "vypis";
            sekceSPojistenci.appendChild(vypis);
        } else {
            const tabulkaPojistencu = document.createElement("table");
            const hlavickatabulky = document.createElement("thead");
            const bunkaHlavickyJmeno = document.createElement("td");
            const bunkaHlavickyBydliste = document.createElement("td");
            const bunkaHlavickyEdit = document.createElement("td");

            bunkaHlavickyJmeno.innerHTML = "Jméno";
            bunkaHlavickyBydliste.innerHTML = "Bydliště";
            hlavickatabulky.appendChild(bunkaHlavickyJmeno);
            hlavickatabulky.appendChild(bunkaHlavickyBydliste);
            hlavickatabulky.appendChild(bunkaHlavickyEdit);

            tabulkaPojistencu.appendChild(hlavickatabulky);
            for (let pojistenec of this._pojistenci) {
                const radek = document.createElement("tr");
                const bunkaJmeno = document.createElement("td");
                const bunkaBydliste = document.createElement("td");
                const bunkaEdit =  document.createElement("td");

                const odkaz = document.createElement("a");
                odkaz.href = `zobrazeniPojistence.html#${pojistenec._index}`;
                odkaz.innerText = `${pojistenec._jmeno} ${pojistenec._prijmeni}`;
                odkaz.setAttribute("style", "color: blue");
                bunkaJmeno.appendChild(odkaz);
                bunkaBydliste.innerHTML = `${pojistenec._adresa}, ${pojistenec._mesto}`;

                const tlacitkoSmaz = document.createElement("a");
                tlacitkoSmaz.className = "tlacitko-smaz";
                tlacitkoSmaz.innerHTML = "Smaž";
                tlacitkoSmaz.id = pojistenec._index;
                tlacitkoSmaz.onclick = () => {
                    this.smazPojistence(tlacitkoSmaz.id);
                    this.vypisPojistencu();
                };
                const tlacitkoEdituj = document.createElement("a");
                tlacitkoEdituj.className = "tlacitko-edituj";
                tlacitkoEdituj.innerHTML = "Edituj";
                tlacitkoEdituj.setAttribute("href", `novyEditPojistenec.html#${pojistenec._index}`);
                bunkaEdit.appendChild(tlacitkoSmaz);
                bunkaEdit.appendChild(tlacitkoEdituj);
                bunkaEdit.className="bunka-edit";

                radek.appendChild(bunkaJmeno);
                radek.appendChild(bunkaBydliste);
                radek.appendChild(bunkaEdit);
                tabulkaPojistencu.appendChild(radek);
            }
            sekceSPojistenci.appendChild(tabulkaPojistencu);
        }
    }

    /**
     * Funkce smaže pojištěnce včetně sjednaných pojištění. V případě neúspěchu vrátí false
     * @param index {number} index pojištěnce
     * @returns {boolean} potvrzení smazání pojištěnce
     */
    smazPojistence(index) {
        let indexMazaneho;
        this.nactiSjednanaPojisteni();
        if (confirm("Opravdu chcete smazat záznam pojištěnce?")) {
            for (let i = 0; i < this._pojistenci.length; i++) {
                if (this._pojistenci[i]._index == index) {
                    indexMazaneho = i;
                }
            }
            /*
            * Smaze sjednana pojisteni pojistence
            * */
            for (let i = 0; i < this._sjednanaPojisteni.length; i++) {
                if (this._sjednanaPojisteni[i]._idPojistence == this._pojistenci[indexMazaneho]._index) {
                    this._sjednanaPojisteni.splice(i, 1);
                    i -= 1;
                }
            }
            this.ulozSjednanaPojisteni();

            this._pojistenci.splice(indexMazaneho, 1);
            this.ulozPojistence();
            return true;
        } else {
            return false;
        }
    }
}