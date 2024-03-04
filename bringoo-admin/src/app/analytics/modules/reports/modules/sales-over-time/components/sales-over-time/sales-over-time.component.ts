import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { AnalyticsSalesService } from '../../../../../../../../shared/api/auth/analytics-sales.service';
import { CrudStoreService } from '../../../../../../../../shared/api/auth/crud-store.service';
import {
  BarChartValueDto,
  GroupByDateEnum,
  SalesOverTimeDto,
  SalesOverTimeInput,
  StoreEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DEFAULT_CURRENCY_SYMBOL } from '../../../../../../../../shared/const/default-currency-symbol.const';

@UntilDestroy()
@Component({
  selector: 'app-sales-over-time',
  templateUrl: './sales-over-time.component.html',
  styleUrls: ['sales-over-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesOverTimeComponent implements OnInit {
  salesQuery: BehaviorSubject<SalesOverTimeInput> = new BehaviorSubject<SalesOverTimeInput>({
    groupBy: GroupByDateEnum.DAY,
    dateStart: '',
    dateEnd: '',
  });

  dateTimeFormat: string = DATE_TIME_FORMAT;
  defaultCurrency: string = DEFAULT_CURRENCY_SYMBOL;

  sales: BarChartValueDto[] = [];

  chartData$: Observable<{
    data: number[];
    labels: string[];
    totals: { grandTotal: number; costSales: number; averageCheck: number };
  }> = new Observable<{ data: number[]; labels: string[]; totals: { grandTotal: number; costSales: number; averageCheck: number } }>();

  isLoaded$: Observable<boolean> = this.service.isLoading$.pipe(map((status: boolean) => !status));

  storeName!: Observable<string>;

  constructor(private readonly service: AnalyticsSalesService, private readonly storeService: CrudStoreService) {}

  ngOnInit(): void {
    this.observeOnFilters();
  }

  observeOnFilters(): void {
    this.chartData$ = this.salesQuery.asObservable().pipe(
      untilDestroyed(this),
      filter((query: SalesOverTimeInput) => !!(query.dateStart && query.dateEnd)),
      switchMap((query: SalesOverTimeInput): Observable<SalesOverTimeDto> => this.service.getSalesOverTime(query)),
      map((sales: SalesOverTimeDto): {
        data: number[];
        labels: string[];
        totals: { grandTotal: number; costSales: number; averageCheck: number };
      } => {
        if (sales.items.length > 0) {
          return {
            labels: sales.items.map((sale: BarChartValueDto) => sale.label),
            data: sales.items.map((sale: BarChartValueDto) => sale.value),
            totals: {
              grandTotal: sales.grandTotal,
              costSales: sales.costSales,
              averageCheck: sales.averageCheck,
            },
          };
        }

        return {
          labels: [],
          data: [],
          totals: {
            grandTotal: 0,
            costSales: 0,
            averageCheck: 0,
          },
        };
      }),
    );

    this.storeName = this.salesQuery.asObservable().pipe(
      switchMap(
        ({ storeId }: SalesOverTimeInput): Observable<StoreEntity> =>
          storeId ? this.storeService.findOne(storeId, { fields: 'name_i18n' }) : (of({ name_i18n: 'Store' }) as Observable<StoreEntity>),
      ),
      map(({ name_i18n }: StoreEntity): string => name_i18n ?? 'Store'),
    );
  }

  filterPatch({
    dateEnd,
    dateStart,
    storeId,
    groupBy,
    storeRegionCode,
    storeCorporateCode,
    storeBrandCode,
    vendorCategoryCode,
    vendorTypeCode,
  }: SalesOverTimeInput): void {
    this.salesQuery.next({
      dateEnd,
      dateStart,
      groupBy,
      ...(storeRegionCode && { storeRegionCode }),
      ...(storeCorporateCode && { storeCorporateCode }),
      ...(storeBrandCode && { storeBrandCode }),
      ...(vendorCategoryCode && { vendorCategoryCode }),
      ...(vendorTypeCode && { vendorTypeCode }),
      ...(storeId && { storeId: storeId }),
    });
  }
}
