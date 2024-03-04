import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import * as ChartLabel from 'chartjs-plugin-datalabels';
import { Context } from 'chartjs-plugin-datalabels';

import { BAR_CHARTS_CONFIG } from '../../../../config/bar-charts-config';

@Component({
  selector: 'app-bar-chart-percentage',
  templateUrl: './bar-chart-percentage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartPercentageComponent implements OnInit {
  @Input() set chartData(value: { data: number[]; labels: string[] } | null) {
    if (value) {
      this.setBarChartOptions(value);
    } else {
      this.barConfig = null;
    }
  }

  plugins: ChartConfiguration<'bar'>['plugins'] = [ChartLabel.default] as ChartConfiguration<'bar'>['plugins'];

  public barConfig: {
    labels: string[];
    dataSet: ChartConfiguration<'bar'>['data']['datasets'];
    height: number;
    options: ChartConfiguration<'bar'>['options'];
  } | null = null;

  ngOnInit(): void {}

  setBarChartOptions({ labels, data }: { data: number[]; labels: string[] }): void {
    this.barConfig = {
      ...BAR_CHARTS_CONFIG,
      labels: labels,
      height: this.canvasHeightByItems(data.length),
      dataSet: [
        {
          ...BAR_CHARTS_CONFIG.dataSet,
          data: data,
        },
      ],
      options: {
        ...BAR_CHARTS_CONFIG.options,
        elements: {
          bar: {
            borderRadius: 5,
            backgroundColor: 'rgba(103, 119, 152, 0.3)',
            hoverBackgroundColor: 'rgba(128,146,182,0.3)',
          },
        },
        plugins: {
          ...BAR_CHARTS_CONFIG.options?.plugins,
          datalabels: {
            display: true,
            anchor: 'start',
            align: 'end',
            offset: 3,
            font: {
              weight: 'normal',
              style: 'italic',
              size: 14,
            },
            formatter: (value: number, { dataIndex }: Context): string => `${labels[dataIndex]} · ${value}%`,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    };
  }

  private canvasHeightByItems(itemsCount: number): number {
    return 22 * itemsCount;
  }
}
