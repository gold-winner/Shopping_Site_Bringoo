import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AnalyticsCustomersService } from '../../../../../../../shared/api/auth/analytics-customers.service';
import { BarChartValueDto, CustomerRevenueTypesEnum } from '../../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-revenue-shop-breakdown',
  templateUrl: './revenue-shop-breakdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevenueShopBreakdownComponent implements OnInit {
  @Input() customerId!: string;
  revenueType: UntypedFormControl = this.fb.control(null);
  revenueTypes: string[] = Object.values(CustomerRevenueTypesEnum);

  isLoading$: Observable<boolean> = this.service.isLoading$;

  barChart: BehaviorSubject<{ data: number[]; labels: string[] } | null> = new BehaviorSubject<{ data: number[]; labels: string[] } | null>(
    null,
  );

  isLoaded$: Observable<boolean> = this.service.isLoading$.pipe(map((status: boolean) => !status));

  constructor(private readonly service: AnalyticsCustomersService, private readonly fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.revenueType.valueChanges
      .pipe(
        switchMap(
          (revenueType: CustomerRevenueTypesEnum): Observable<BarChartValueDto[]> =>
            this.service.customerRevenueBreakdown(this.customerId, { revenueType }),
        ),
      )
      .subscribe((value: BarChartValueDto[]) => {
        this.barChart.next({
          data: value.map(({ value }: BarChartValueDto) => value),
          labels: value.map(({ label }: BarChartValueDto) => label),
        });
      });

    this.revenueType.patchValue(CustomerRevenueTypesEnum.STORE);
  }
}
