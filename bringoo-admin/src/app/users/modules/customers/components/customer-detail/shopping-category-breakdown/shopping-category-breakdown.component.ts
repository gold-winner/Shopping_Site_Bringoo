import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnalyticsCustomersService } from '../../../../../../../shared/api/auth/analytics-customers.service';
import { StackedBarChartValueDto } from '../../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-shopping-category-breakdown',
  templateUrl: './shopping-category-breakdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCategoryBreakdownComponent implements OnInit {
  @Input() customerId!: string;

  chartData: BehaviorSubject<{ data: number[]; labels: string[] } | null> = new BehaviorSubject<{
    data: number[];
    labels: string[];
  } | null>(null);

  isLoaded$: Observable<boolean> = this.service.isLoading$.pipe(map((status: boolean) => !status));

  constructor(private readonly service: AnalyticsCustomersService) {}

  ngOnInit(): void {
    this.service.customerCategoryBreakdown(this.customerId).subscribe((values: StackedBarChartValueDto[]) => {
      if (values.length > 0) {
        this.chartData.next({
          labels: values.map((barValue: StackedBarChartValueDto) => barValue.name),
          data: values.map((barValue: StackedBarChartValueDto) => barValue.value),
        });
      }
    });
  }
}
