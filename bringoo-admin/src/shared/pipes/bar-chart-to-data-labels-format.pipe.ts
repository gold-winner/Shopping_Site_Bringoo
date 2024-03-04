import { Pipe, PipeTransform } from '@angular/core';

import { BarChartValueDto } from '../api/auth/data-contracts';

@Pipe({ name: 'barChartToDataLabelsFormat' })
export class BarChartToDataLabelsFormatPipe implements PipeTransform {
  transform(value: BarChartValueDto[]): { data: number[]; labels: string[] } {
    return {
      data: value.map(({ value }: BarChartValueDto) => value),
      labels: value.map(({ label }: BarChartValueDto) => label),
    };
  }
}
