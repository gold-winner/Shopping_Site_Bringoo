import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AnalyticsProductSearchService } from '../../../../../../../../shared/api/auth/analytics-product-search.service';
import { AnalyticsStoreService } from '../../../../../../../../shared/api/auth/analytics-store.service';
import { CrudStoreService } from '../../../../../../../../shared/api/auth/crud-store.service';
import { BarChartValueDto, StoreEntity, StorePerformanceTotalsDto } from '../../../../../../../../shared/api/auth/data-contracts';
import { BarChartValuesToDataAndLabels } from '../../../../../../../../shared/helpers/bar-chart-values-to-data-and-labels';
import { OrdersHeatMapToCalendar } from '../../../../../../../../shared/helpers/orders-heat-map-to-calendar';
import { NavigationService } from '../../../../../../../../shared/services/navigation.service';
import { CalendarDataType } from '../../../../../../../../shared/types/calendar-data.type';
import { OrdersFiltersType } from '../../../../../../../../shared/types/orders.filters.type';

@UntilDestroy()
@Component({
  selector: 'app-store-performance',
  templateUrl: 'store-performance.component.html',
  styleUrls: ['store-performance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorePerformanceComponent implements OnInit {
  form!: UntypedFormGroup;
  storeId!: string;
  backPage: string = '../';

  store$!: Observable<StoreEntity>;
  performanceTotals$!: Observable<StorePerformanceTotalsDto>;

  fields: (keyof StoreEntity)[] = ['logoUrl', 'name_i18n'];
  join: (keyof StoreEntity)[] = ['openingHours', 'deliveryTime', 'vendorType', 'addresses'];

  ordersHistory$!: Observable<{ data: CalendarDataType[]; count: number }>;
  ordersByHoursReloaded: BehaviorSubject<symbol> = new BehaviorSubject<symbol>(Symbol('reload'));
  ordersByHours$!: Observable<BarChartValueDto[]>;
  storeProductCategoryPurchase$!: Observable<BarChartValueDto[]>;
  isLoaded$: Observable<boolean> = this.performance.isLoading$.pipe(map((status: boolean) => !status));

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: CrudStoreService,
    private readonly performance: AnalyticsStoreService,
    private readonly fb: UntypedFormBuilder,
    private readonly navigationService: NavigationService,
    private readonly analyticsProductSearch: AnalyticsProductSearchService,
  ) {}

  ngOnInit(): void {
    if (this.navigationService.history.length > 1) {
      this.backPage = this.navigationService.history[this.navigationService.history.length - 2];
    }
    this.buildForm();
  }

  formatter = BarChartValuesToDataAndLabels;

  buildForm(): void {
    this.form = this.fb.group({
      storeId: [null, [Validators.required]],
      dateStart: [],
      dateEnd: [],
    });

    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        tap(({ storeId }: Required<OrdersFiltersType>) => {
          this.ordersByHoursReloaded.next(Symbol('reload'));
          if (storeId) {
            this.storeId = storeId;
            this.router.navigate([], { queryParams: { storeId }, replaceUrl: true }).then();
            this.reloadPage(storeId);
          }
        }),
      )
      .subscribe();

    if (this.route.snapshot.queryParams.storeId) {
      this.form.patchValue({ storeId: this.route.snapshot.queryParams.storeId });
    }
  }

  reloadPage(storeId: string): void {
    this.buildOrderByHours(storeId);
    this.buildStoreInformation(storeId);
    this.buildOrderHistory(storeId);
    this.buildStoreProductCategoryPurchase(storeId);
    this.buildTotals(storeId);
    this.ordersByHoursReloaded.next(Symbol('reload'));
  }

  buildOrderByHours(storeId: string): void {
    this.ordersByHours$ = this.ordersByHoursReloaded.asObservable().pipe(
      switchMap(
        (): Observable<BarChartValueDto[]> => {
          const { dateStart, dateEnd }: { dateStart?: string; dateEnd?: string } = this.form.getRawValue();
          return this.performance.ordersByHours(storeId, {
            ...(dateStart && { dateStart }),
            ...(dateEnd && { dateEnd }),
          });
        },
      ),
    );
  }

  buildStoreInformation(storeId: string): void {
    this.store$ = this.service.findOne(storeId, { fields: this.fields.join(','), join: this.join });
  }

  buildOrderHistory(storeId: string): void {
    this.ordersHistory$ = this.performance.performanceOrderHistory(storeId).pipe(map(OrdersHeatMapToCalendar));
  }

  buildTotals(storeId: string): void {
    this.performanceTotals$ = this.performance.performanceTotals(storeId);
  }

  buildStoreProductCategoryPurchase(storeId: string): void {
    this.storeProductCategoryPurchase$ = this.performance.productCategoryPurchase(storeId);
  }
}
