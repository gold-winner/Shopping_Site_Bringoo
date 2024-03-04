import { Injectable } from '@angular/core';

import { LangCodeEnum } from '../api/auth/data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppLanguageService {
  private _language: LangCodeEnum;

  constructor() {
    this._language = (localStorage.getItem('lang') as LangCodeEnum) ?? LangCodeEnum.EN;
  }

  set language(lang: LangCodeEnum) {
    this._language = lang;
    localStorage.setItem('lang', lang);
  }

  get language(): LangCodeEnum {
    return this._language;
  }
}
