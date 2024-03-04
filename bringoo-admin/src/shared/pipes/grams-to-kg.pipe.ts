import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'gramsToKg' })
export class GramsToKgPipe implements PipeTransform {
  transform(grams: number): string {
    return grams ? `${(grams / 1000).toLocaleString('DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} kg` : `0.00 kg`;
  }
}
