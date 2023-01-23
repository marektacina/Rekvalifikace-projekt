'use strict'

/**
 * Trida reprezentuje sjednaná pojištění. K pojištěncí se přiřazuje prostřednicvím atributu _idPojistence
 */
class SjednanaPojisteni {
    _typPojisteni;
    _castka;
    _predmetPojisteni;
    _platnostOd;
    _platnostDo;
    _idPojistence;

    get typPojisteni() {
        return this._typPojisteni;
    }

    set typPojisteni(value) {
        this._typPojisteni = value;
    }

    get castka() {
        return this._castka;
    }

    set castka(value) {
        this._castka = value;
    }

    get predmetPojisteni() {
        return this._predmetPojisteni;
    }

    set predmetPojisteni(value) {
        this._predmetPojisteni = value;
    }

    get platnostOd() {
        return this._platnostOd;
    }

    set platnostOd(value) {
        this._platnostOd = value;
    }

    get platnostDo() {
        return this._platnostDo;
    }

    set platnostDo(value) {
        this._platnostDo = value;
    }

    get idPojistence() {
        return this._idPojistence;
    }

    set idPojistence(value) {
        this._idPojistence = value;
    }

    constructor(typPojisteni, castka, predmetPojisteni, platnostOd, platnostDo, idPojistence) {
        this._typPojisteni = typPojisteni;
        this._castka = castka;
        this._predmetPojisteni = predmetPojisteni;
        this._platnostOd = platnostOd;
        this._platnostDo = platnostDo;
        this._idPojistence = idPojistence;
    }
}