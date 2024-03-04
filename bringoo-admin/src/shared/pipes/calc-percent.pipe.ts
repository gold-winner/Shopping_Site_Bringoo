import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'calcPercent' })
export class CalcPercentPipe implements PipeTransform {
  transform(totalValue: number, partialValue: number): number {
    return Math.floor((100 * partialValue) / totalValue);
  }
}
