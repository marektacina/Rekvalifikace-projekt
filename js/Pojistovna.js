'use strict'

/**
 * Trida reprezentuje celou pojistovnu. Atributy jsou pole všech pojištěnců, pole typů pojištění, které pojišťovna
 * nabízí a pole sjednaných pojištění
 */
class Pojistovna {

    /**
     * Provede výpis pojištění do stránky. Třída Pojistovna je pro oprávnění host, pro které není náhled na
     * pojištěnce povolen
     */
    vypisPojistencu() {
        const zpravaUzivatele = document.createElement("p")
        zpravaUzivatele.className = "vypis";
        zpravaUzivatele.innerHTML = "Pro zobrazení seznamu pojištěnců je požadováno oprávnění Pojišťovací agent nebo" +
            " Admin.";
        const sekceSPojistenci = document.getElementById("pojistenci")
        sekceSPojistenci.appendChild(zpravaUzivatele);
    }

    /**
     * Provede výpis typů pojištění do stránky. Třída Pojistovna je pro oprávnění host, pro které není náhled na
     * typy pojištění povolen
     */
    vypisTypyPojisteni() {
        const clanek = document.querySelector(".clanek");
        clanek.innerHTML = "<p>K správě typů pojištění je potřeba oprávnění Admin.</p>"
    }


}