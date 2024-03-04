import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Color } from '@swimlane/ngx-charts/lib/utils/color-sets';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CALENDAR_COLOR_THEMES } from '../../../../config/calendar-color-themes';
import { DEFAULT_CURRENCY_SYMBOL } from '../../../../const/default-currency-symbol.const';
import { ThemeTypeEnum } from '../../../../enums/theme-type.enum';
import { monthName } from '../../../../helpers/month-name';
import { ColorThemeService } from '../../../../services/color-theme.service';
import { CalendarDataType } from '../../../../types/calendar-data.type';

@Component({
  selector: 'app-heat-map-chart',
  templateUrl: './heat-map-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatMapChartComponent implements OnInit {
  @Input() label: string = '';
  @Input() calendarData: CalendarDataType[] = [];
  @Input() count: number = 0;
  @Input() noDataText: string = 'This customer has not placed any orders';
  view: [number, number] = [1100, 200];
  daysInWeek: number = 7;

  colorScheme$: Observable<Color | undefined> = this.themeService.themeChange$.pipe(
    map((theme: ThemeTypeEnum) => {
      if (this.count === 0) return CALENDAR_COLOR_THEMES.get(`customer-heat-map-only-zero`);
      return CALENDAR_COLOR_THEMES.get(`customer-heat-map-${theme}`);
    }),
  );

  constructor(private readonly themeService: ColorThemeService) {}

  ngOnInit(): void {
    this.calculateWidthAndHeight();
  }

  calculateWidthAndHeight(): void {
    if (this.count === 0) {
      return;
    }

    const width: number = 66 + this.calendarData.length * 23 + this.calendarData.length;
    const height: number =
      26 +
      (this.calendarData.length > 1
        ? this.daysInWeek * 23
        : (this.calendarData[0]?.series?.length ?? 0) * 23 + this.calendarData[0].series.length);

    this.view = [width, height];
  }

  calendarAxisTickFormatting(mondayString: string): string {
    const monday: Date = new Date(mondayString);
    const month: number = monday.getMonth();
    const day: number = monday.getDate();
    const year: number = monday.getFullYear();
    const lastSunday: Date = new Date(year, month, day - 1);
    const nextSunday: Date = new Date(year, month, day + 6);
    return lastSunday.getMonth() !== nextSunday.getMonth() ? monthName.format(nextSunday) : '';
  }

  calendarTooltipText(c: any): string {
    return `
      <span class="tooltip-label">
        <div class="f-3">${c.data.toFixed(2)} ${DEFAULT_CURRENCY_SYMBOL} • Count: ${c.cell.count}</div>
      </span>
      <span class="tooltip-val">
        <div class="text-lightgray f-2">${c.label} • ${c.cell.date.toLocaleDateString()}</div>
      </span>
    `;
  }
}
