'use strict'

/**
 * Třída reprezentuje data pojištěnce. Nemá žádné metody, kromě getterů a setterů
 */
class Pojistenec {
    constructor(index, jmeno, prijmeni, email, telefon, adresa, mesto, psc) {
        this._index = index;
        this._jmeno = jmeno;
        this._prijmeni = prijmeni;
        this._email = email;
        this._telefon = telefon;
        this._adresa = adresa;
        this._mesto = mesto;
        this._psc = psc;
    }

    get index() {
        return this._index;
    }

    get jmeno() {
        return this._jmeno;
    }

    get prijmeni() {
        return this._prijmeni;
    }

    get email() {
        return this._email;
    }

    get telefon() {
        return this._telefon;
    }

    get adresa() {
        return this._adresa;
    }

    get mesto() {
        return this._mesto;
    }

    get psc() {
        return this._psc;
    }

    set index(value) {
        this._index = value;
    }

    set jmeno(value) {
        this._jmeno = value;
    }

    set prijmeni(value) {
        this._prijmeni = value;
    }

    set email(value) {
        this._email = value;
    }

    set telefon(value) {
        this._telefon = value;
    }

    set adresa(value) {
        this._adresa = value;
    }

    set mesto(value) {
        this._mesto = value;
    }

    set psc(value) {
        this._psc = value;
    }


}