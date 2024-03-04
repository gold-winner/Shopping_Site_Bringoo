import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements AfterViewInit {
  @Input() title: string = '';

  @Input() data: number[] = [];
  @Input() labels: string[] | number[] = [];
  @Input() dataLabel: string = '';

  @ViewChild('canvas') canvas!: ElementRef;

  @Input() displayXGrid: boolean = true;
  @Input() displayYGrid: boolean = true;
  @Input() gridBorderColor: string = '#111111';

  @Input() showLegend: boolean = true;

  context: CanvasRenderingContext2D | null = null;
  chart: Chart<'line'> | null = null;

  ngAfterViewInit(): void {
    const ctx: CanvasRenderingContext2D | null = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');

    if (ctx) {
      this.context = ctx;

      const purple_orange_gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, 200);
      purple_orange_gradient.addColorStop(0, '#2CC84D');
      purple_orange_gradient.addColorStop(1, 'rgba(255,255,255,0.05)');

      this.chart = new Chart<'line'>(ctx, {
        type: 'line',
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: this.showLegend,
            },
          },
          scales: {
            x: {
              grid: {
                borderColor: this.gridBorderColor,
                borderWidth: 1,
                display: this.displayXGrid,
              },
            },
            y: {
              grid: {
                borderColor: this.gridBorderColor,
                borderWidth: 1,
                display: this.displayYGrid,
              },
            },
          },
        },
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.dataLabel,
              data: this.data,
              backgroundColor: purple_orange_gradient,
              hoverBackgroundColor: purple_orange_gradient,
              hoverBorderWidth: 2,
              hoverBorderColor: '#089326',
              borderWidth: 2,
              borderColor: '#2CC84D',
              fill: true,
            },
          ],
        },
      });
    }
  }
}
