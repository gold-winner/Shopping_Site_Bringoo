import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { Color } from '@swimlane/ngx-charts/lib/utils/color-sets';

import { StackedBarChartValueDto } from '../../../../api/auth/data-contracts';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedBarChartComponent {
  @Input() width!: number;
  @Input() set series(series: StackedBarChartValueDto[]) {
    this.data =
      series.length > 0
        ? [
            {
              name: 'Categories',
              series,
            },
          ]
        : [];
  }

  colorScheme: Color = {
    name: 'colors',
    group: ScaleType.Ordinal,
    selectable: true,
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };

  data: { name: string; series: StackedBarChartValueDto[] }[] = [
    {
      name: 'Categories',
      series: [],
    },
  ];

  TooltipText(c: any): string {
    return `
      <span class="tooltip-label">${c.label} • ${c.cell.date.toLocaleDateString()}</span>
      <span class="tooltip-val">${c.data.toLocaleString()} %</span>
    `;
  }
}
