import { Injectable } from '@angular/core';

import { LangCodeEnum } from '../api/data-contracts';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  _language: LangCodeEnum = LangCodeEnum.EN;

  constructor() {
    if (navigator.language.slice(0, 2).toUpperCase() === 'EN') {
      this._language = LangCodeEnum.EN;
    } else if (navigator.language.slice(0, 2).toUpperCase() === 'DE') {
      this._language = LangCodeEnum.DE;
    } else {
      this._language = LangCodeEnum.EN;
    }
  }

  set language(lang: LangCodeEnum) {
    this._language = lang;
  }

  get language(): LangCodeEnum {
    return this._language;
  }
}
