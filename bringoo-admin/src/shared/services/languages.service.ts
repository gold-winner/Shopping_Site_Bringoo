import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { CrudLanguageService } from '../api/auth/crud-language.service';
import { LangCodeEnum, LanguageEntity, Pageable } from '../api/auth/data-contracts';
import { CondOperator } from '../modules/crud/enums/cond-operator';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  isLoading: Observable<boolean> = this.service.isLoading$;
  private _languages: string[] = [];
  private _primaryLang: string = '';

  loadLanguages: BehaviorSubject<symbol> = new BehaviorSubject<symbol>(Symbol('load'));

  languages$: Observable<string[]> = this.loadLanguages.asObservable().pipe(
    switchMap(() => this.service.find({ sort: ['isPrimary,DESC'], filter: [['isActive', CondOperator.EQUALS, true].join('||')] })),
    tap((value: Pageable & { items?: LanguageEntity[] }) => {
      const primaryLang: LanguageEntity | undefined = value.items?.find(({ isPrimary }: LanguageEntity) => isPrimary);
      if (primaryLang?.code) {
        this._primaryLang = primaryLang.code;
      } else {
        if (value.items?.length) {
          this._primaryLang = value.items[0].code ?? LangCodeEnum.EN;
        }
      }
    }),
    map((value: Pageable & { items?: LanguageEntity[] }): string[] => {
      return value.items?.map(({ code }: LanguageEntity): string => code ?? '') ?? [];
    }),
    tap((languages: string[]) => {
      this._languages = languages ? [...languages] : [];
    }),
  );

  constructor(private readonly service: CrudLanguageService) {}

  get languages(): string[] {
    return this._languages;
  }

  get primaryLang(): string {
    return this._primaryLang;
  }
}
