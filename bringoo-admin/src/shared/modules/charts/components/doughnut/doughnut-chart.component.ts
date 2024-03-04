import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ArcElement, Chart, ChartData, ChartDataset, ChartOptions, Plugin, TooltipCallbacks, TooltipItem, TooltipOptions } from 'chart.js';
import datalabels, { Context } from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: 'doughnut-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoughnutChartComponent implements AfterViewInit {
  @ViewChild('canvas', { read: ElementRef }) canvas!: ElementRef;
  @Input() datasets!: ChartDataset<'doughnut', number[]>[];
  @Input() labels!: string[];
  @Input() formatterSymbol: string = '';

  @Input() set refresh(value: symbol | null) {
    if (value) {
      this.setData();
    }
  }

  chart!: Chart<'doughnut'>;

  private doughnutChartData!: ChartData<'doughnut', number[], string>;
  private plugins: Plugin<'doughnut'>[] = [datalabels as Plugin<'doughnut'>];

  private options: ChartOptions<'doughnut'> = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels: {
        borderWidth: 3,
        font: {
          weight: 'bold',
          style: 'italic',
          size: 14,
        },
        color(d: Context): string {
          return d.dataIndex === 2 ? 'black' : 'white';
        },
        formatter: (value: number): string => {
          return value === 0 ? '' : `${Number.isInteger(value) ? value : value.toFixed(2)}${this.formatterSymbol}`;
        },
        align: 'center',
        anchor: 'center',
      },
    },
    layout: {
      padding: {
        bottom: 5,
      },
    },
    maintainAspectRatio: false,
  };

  ngAfterViewInit(): void {
    this.setData();
  }

  setData(): void {
    const tooltip: Partial<TooltipOptions<'doughnut'>> = {
      callbacks: {
        title(tooltipItems: TooltipItem<'doughnut'>[]): string | string[] {
          return tooltipItems.map((item: TooltipItem<'doughnut'>) => item.dataset.label ?? '');
        },
        label: (tooltipItem: TooltipItem<'doughnut'>): string | string[] => {
          return `${tooltipItem.label}: ${tooltipItem.formattedValue}${this.formatterSymbol}`;
        },
      } as TooltipCallbacks<'doughnut'>,
    };

    this.doughnutChartData = {
      labels: this.labels,
      datasets: this.datasets,
    };
    this.options = {
      ...this.options,
      plugins: {
        ...this.options.plugins,
        tooltip,
      },
    };

    if (!this.chart && this.canvas?.nativeElement) {
      this.chart = new Chart(
        { canvas: this.canvas.nativeElement },
        {
          options: {
            ...this.options,
          },
          plugins: [
            ...this.plugins,
            {
              id: 'arrow',
              afterDatasetsDraw: (chart: Chart): void => {
                const metasets: { data: (ArcElement & any)[] }[] = (chart as any)._sortedMetasets;
                for (const [index, { data }] of metasets.entries()) {
                  if (index === 0) continue;
                  const { x, y, outerRadius, innerRadius }: { x: number; y: number; innerRadius: number; outerRadius: number } = data[0];

                  chart.ctx.font = '16px "Nunito", sans-serif';
                  chart.ctx.fillStyle = 'white';
                  chart.ctx.fillText(`№ ${index}`, x, y - outerRadius / 2 - innerRadius / 2 + 2);
                }
              },
            },
          ],
          type: 'doughnut',
          data: this.doughnutChartData,
        },
      );
    }

    if (this.chart) {
      this.chart.options = this.options;
      this.chart.data = this.doughnutChartData;
      this.chart.update();
    }
  }
}
