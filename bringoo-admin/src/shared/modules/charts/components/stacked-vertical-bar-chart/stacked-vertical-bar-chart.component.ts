import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import {
  ActiveElement,
  Chart,
  ChartConfiguration,
  ChartDataset,
  ChartEvent,
  ChartMeta,
  InteractionItem,
  Plugin,
  TooltipCallbacks,
  TooltipOptions,
} from 'chart.js';
import datalabels, { Context } from 'chartjs-plugin-datalabels';

import { BarChartValueDto } from '../../../../api/auth/data-contracts';
import { BAR_CHARTS_CONFIG } from '../../../../config/bar-charts-config';

@Component({
  selector: 'app-stacked-vertical-bar-chart',
  templateUrl: './stacked-vertical-bar-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class StackedVerticalBarChartComponent implements OnInit {
  public barConfig: {
    labels: string[];
    dataSet: ChartConfiguration<'bar'>['data']['datasets'] & any;
    height: number;
    options: ChartConfiguration<'bar'>['options'] & any;
  } | null = null;

  public barChartLegend = false;

  @Input() chartHeight?: number;

  @Input() set series(data: { labels: string[]; series: ChartDataset[] }) {
    this.data = data ?? [];
  }

  @Input() colorScheme: { domain: string[] } = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };

  @Input() tooltipCallbacks?: Partial<TooltipCallbacks<'bar'>>;

  @Output() onClick: EventEmitter<BarChartValueDto & { stack?: string }> = new EventEmitter<BarChartValueDto & { stack?: string }>();

  data: { labels: string[]; series: ChartDataset[] } = { labels: [], series: [] };

  plugins: Plugin[] = [datalabels];

  constructor(private readonly ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setBarChartOptions(this.data);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.ref.markForCheck();
  }

  setBarChartOptions({ labels, series }: { labels: string[]; series: ChartDataset[] }): void {
    const tooltip: Partial<TooltipOptions<'bar'>> = {
      mode: 'x',
      ...(this.tooltipCallbacks && { callbacks: { ...this.tooltipCallbacks } as TooltipCallbacks<'bar'> }),
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.barConfig = {
      ...BAR_CHARTS_CONFIG,
      labels: labels,
      height: this.chartHeight ?? 22 * labels.length + 40,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x',
        elements: {
          bar: {
            borderRadius: 5,
          },
        },
        plugins: {
          datalabels: {
            borderWidth: 3,
            font: {
              weight: 'bold',
              style: 'italic',
              size: 14,
            },
            formatter: (value: number, { dataIndex, dataset }: Context): string => {
              let total: number = 0;
              for (const { data, stack } of series) {
                if (dataset.stack === stack) {
                  total = total + ((data[dataIndex] as number) || 0);
                }
              }
              return `${total}`;
            },
            anchor: 'end',
            align: 'center',
          },
          tooltip,
        },
        scales: {
          x: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              display: true,
              stepSize: 2,
              textStrokeWidth: 4,
            },
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart): void => {
          const items: InteractionItem[] = chart.getElementsAtEventForMode(event as any, 'x', { axis: 'x', intersect: true }, true);
          if (items.length > 0) {
            const meta: ChartMeta = chart.getDatasetMeta(items[0].datasetIndex);

            this.onClick.emit({
              label: meta.label,
              value: items[0].index,
              stack: meta.stack ? `${meta.stack}` : '',
            });
          }
        },
      },
      dataSet: [...series],
    };
  }
}
