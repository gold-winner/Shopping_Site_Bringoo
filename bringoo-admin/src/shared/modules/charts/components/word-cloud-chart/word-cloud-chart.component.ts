import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChartData, ScriptableContext } from 'chart.js';
import { WordCloudChart } from 'chartjs-chart-wordcloud';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { ThemeTypeEnum } from '../../../../enums/theme-type.enum';
import { ColorThemeService } from '../../../../services/color-theme.service';

@UntilDestroy()
@Component({
  selector: 'app-word-cloud-chart',
  templateUrl: './word-cloud-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block w-100p h-100p' },
})
export class WordCloudChartComponent implements AfterViewInit {
  @ViewChild('wordCloud', { read: ElementRef }) canvas?: ElementRef<HTMLCanvasElement>;

  @Input() asyncDataObserver!: Observable<{ key: string; value: number }[]>;

  wordCloudChart?: WordCloudChart;

  defaultColor: string = '';
  greenColor: string = '#2CC84D';

  constructor(private readonly colorTheme: ColorThemeService) {
    this.setDefaultColor(this.colorTheme.currentTheme);
    this.watchOnColorThemeChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.wordCloudChart?.update();
  }

  setDefaultColor(theme: ThemeTypeEnum): void {
    this.defaultColor = theme === ThemeTypeEnum.dark ? '#fff' : '#1d1c1c';
  }

  watchOnColorThemeChanges(): void {
    this.colorTheme.themeChange$.pipe(untilDestroyed(this), distinctUntilChanged()).subscribe((theme: ThemeTypeEnum) => {
      this.setDefaultColor(theme);
      this.wordCloudChart?.update();
    });
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.asyncDataObserver.subscribe((data: { key: string; value: number }[]) => this.buildChart(data));
  }

  buildChart(data: { key: string; value: number }[]): void {
    const maxValue: number = data.reduce((max: number, { value }: { key: string; value: number }) => (max > value ? max : value), 0);
    const averageValue: number =
      data.reduce((averageV: number, { value }: { key: string; value: number }) => (averageV += value), 0) / data.length;

    const chartData: ChartData<'wordCloud', number[], string> = {
      labels: data.map((d: { key: string; value: number }): string => d.key),
      datasets: [
        {
          data: data.map((d: { key: string; value: number }): number => d.value ?? 0),
          color: (ctx: ScriptableContext<'wordCloud'>): string => {
            const value: number = ctx.raw as number;
            const index: number = ctx.dataIndex;
            return (index + 1) % 2 && averageValue < value ? this.greenColor : this.defaultColor;
          },
          padding: 5,
          size: (ctx: ScriptableContext<'wordCloud'>): number => {
            const value: number = Number(ctx.raw);
            return Math.round((value / maxValue) * 70);
          },
          family: 'Nunito, sans-serif',
        },
      ],
    };

    if (this.canvas?.nativeElement) {
      const ctx: CanvasRenderingContext2D | null = this.canvas.nativeElement.getContext('2d');
      if (this.wordCloudChart) {
        this.wordCloudChart.destroy();
      }
      if (ctx) {
        this.wordCloudChart = new WordCloudChart(ctx, {
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            animation: {
              duration: 0,
            },
          },
        });
      }
    }
  }
}
