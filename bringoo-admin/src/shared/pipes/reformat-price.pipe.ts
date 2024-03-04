import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reFormatPrice' })
export class ReFormatPricePipe implements PipeTransform {
  transform(formatPrice: string | undefined): number {
    return formatPrice ? Number.parseFloat(formatPrice.replace(',', '.')) : 0;
  }
}
