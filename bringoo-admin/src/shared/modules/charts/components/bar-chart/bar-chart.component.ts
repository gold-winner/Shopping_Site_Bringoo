import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActiveElement, ChartConfiguration } from 'chart.js';
import * as ChartLabel from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

import { BarChartValueDto } from '../../../../api/auth/data-contracts';
import { BAR_CHARTS_CONFIG } from '../../../../config/bar-charts-config';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  host: { class: 'd-block' },
})
export class BarChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  @Input() set chartData(value: { data: number[]; labels: string[] } | null) {
    if (value) {
      this._chartData = value;
      this.resetData();
    } else {
      this._chartData = {
        data: [],
        labels: [],
      };
    }
  }

  private _chartData!: { data: number[]; labels: string[] };

  @Input() indexAxios: 'x' | 'y' = 'y';
  @Input() chartHeight?: number;
  @Input() formatterSymbol: string = '';

  @Input() barChartLegend: boolean = false;
  plugins: ChartConfiguration<'bar'>['plugins'] = [ChartLabel.default] as ChartConfiguration<'bar'>['plugins'];

  @Output() onClick: EventEmitter<BarChartValueDto> = new EventEmitter<BarChartValueDto>();

  labels!: string[];
  dataSet!: ChartConfiguration<'bar', number[], string[]>['data']['datasets'];
  height!: number;
  options!: ChartConfiguration<'bar', number[], string[]>['options'];

  ngOnInit(): void {
    this.setChartOptions();
  }

  setChartOptions(): void {
    this.options = {
      ...BAR_CHARTS_CONFIG.options,
      indexAxis: this.indexAxios,
      plugins: {
        datalabels: {
          ...BAR_CHARTS_CONFIG.options?.plugins?.datalabels,
          formatter: (value: number): string => `${value} ${this.formatterSymbol}`,
        },
      },
      onClick: (_: any, elements: ActiveElement[]): void => {
        if (elements.length > 0) {
          this.onClick.emit({ label: this._chartData.labels[elements[0].index], value: this._chartData.data[elements[0].index] });
        }
      },
    };
    this.height = this.chartHeight ?? 22 * this._chartData.data.length + 40;
  }

  resetData(): void {
    this.height = this.chartHeight ?? 22 * this._chartData.data.length + 40;
    this.dataSet = [
      {
        data: this._chartData.data,
      },
    ];
    this.labels = [...this._chartData.labels];
  }
}
