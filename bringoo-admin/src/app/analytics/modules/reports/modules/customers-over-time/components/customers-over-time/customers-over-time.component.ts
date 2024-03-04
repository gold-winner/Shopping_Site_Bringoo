import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as ChartLabel from 'chartjs-plugin-datalabels';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { AnalyticsCustomersService } from '../../../../../../../../shared/api/auth/analytics-customers.service';
import { AnalyticsCustomersOveTimeInput, BarChartValueDto, GroupByDateEnum } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { ChartDataType } from '../../../../../../../../shared/modules/charts/types/chart-data.type';

@UntilDestroy()
@Component({
  selector: 'app-customers-over-time',
  templateUrl: './customers-over-time.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersOverTimeComponent implements OnInit {
  salesQuery: BehaviorSubject<AnalyticsCustomersOveTimeInput> = new BehaviorSubject<AnalyticsCustomersOveTimeInput>({
    groupBy: GroupByDateEnum.DAY,
    dateStart: '',
    dateEnd: '',
  });

  dateTimeFormat: string = DATE_TIME_FORMAT;

  chartData$!: Observable<ChartDataType | null>;

  isLoaded: Observable<boolean> = this.service.isLoading$.pipe(map((status: boolean) => !status));

  plugins: any[] = [ChartLabel.default];

  constructor(private readonly service: AnalyticsCustomersService) {}

  ngOnInit(): void {
    this.observeOnFilters();
  }

  observeOnFilters(): void {
    this.chartData$ = this.salesQuery.asObservable().pipe(
      untilDestroyed(this),
      filter((query: AnalyticsCustomersOveTimeInput) => !!(query.dateStart && query.dateEnd)),
      switchMap((query: AnalyticsCustomersOveTimeInput): Observable<BarChartValueDto[]> => this.service.customersOverTime(query)),
      map((customersRegistrations: BarChartValueDto[]): ChartDataType | null => {
        return {
          labels: customersRegistrations.map((barValue: BarChartValueDto) => barValue.label),
          data: customersRegistrations.map((barValue: BarChartValueDto) => barValue.value),
        };
      }),
    );
  }

  filterPatch({ dateEnd, dateStart, role, groupBy, tags, languageCode }: AnalyticsCustomersOveTimeInput): void {
    this.salesQuery.next({
      dateEnd,
      dateStart,
      groupBy,
      ...(role && { role }),
      ...(tags && { tags }),
      ...(languageCode && { languageCode }),
    });
  }
}
