import { BarChartValueDto } from '../api/auth/data-contracts';

export function BarChartValuesToDataAndLabels(value: BarChartValueDto[]): { data: number[]; labels: string[] } {
  return {
    data: value.map(({ value }: BarChartValueDto) => value),
    labels: value.map(({ label }: BarChartValueDto) => label),
  };
}
