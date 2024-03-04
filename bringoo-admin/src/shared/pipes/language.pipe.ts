import { Pipe, PipeTransform } from '@angular/core';

import { LangCodeEnum } from '../api/auth/data-contracts';

@Pipe({ name: 'language' })
export class LanguagePipe implements PipeTransform {
  transform(value: any, language: string): string {
    return value[language] || value[LangCodeEnum.EN] || '';
  }
}
