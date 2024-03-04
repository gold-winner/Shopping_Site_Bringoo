import { formatCurrency } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { DEFAULT_CURRENCY_CODE } from '../const/default-currency-code.const';
import { DEFAULT_CURRENCY_SYMBOL } from '../const/default-currency-symbol.const';
import { DEFAULT_LOCALE } from '../const/default-locale.conts';

@Pipe({ name: 'formatPrice' })
export class FormatPricePipe implements PipeTransform {
  currencyCode: string = DEFAULT_CURRENCY_CODE;
  currencySymbol: string = DEFAULT_CURRENCY_SYMBOL;
  locale: string = DEFAULT_LOCALE;
  digitsInfo: string = '1.2-2';

  transform(price: number = 0, storeCurrencyCode?: string): string {
    return formatCurrency(price, this.locale, this.currencySymbol, storeCurrencyCode ?? this.currencyCode, this.digitsInfo);
  }
}
