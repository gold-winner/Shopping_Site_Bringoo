import { ChartConfiguration } from 'chart.js';

import { DEFAULT_CURRENCY_SYMBOL } from '../const/default-currency-symbol.const';

export const BAR_CHARTS_CONFIG: {
  labels: string[];
  dataSet: ChartConfiguration<'bar'>['data']['datasets'];
  height: number;
  options: ChartConfiguration<'bar'>['options'];
} = {
  labels: [],
  dataSet: [
    {
      data: [],
      label: 'Set data label',
      barThickness: 12,
    },
  ],
  height: 100,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    elements: {
      bar: {
        borderRadius: 5,
      },
    },
    plugins: {
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'left',
        offset: -10,
        borderWidth: 3,
        font: {
          weight: 'bold',
          style: 'italic',
          size: 14,
        },
        formatter: (value: number): string => `${value} ${DEFAULT_CURRENCY_SYMBOL}`,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          display: true,
          stepSize: 2,
          textStrokeWidth: 4,
        },
      },
    },
  },
};
