import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { AnalyticsCustomersService } from '../../../../../../../../shared/api/auth/analytics-customers.service';
import {
  LoyalCustomerDto,
  LoyalCustomerInput,
  LoyalCustomerOrderedFieldsEnum,
  OrderedEnum,
  PageableLoyalCustomerDto,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';

@UntilDestroy()
@Component({
  selector: 'app-loyal-customers',
  templateUrl: './loyal-customers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoyalCustomersComponent implements OnInit {
  salesQuery: BehaviorSubject<LoyalCustomerInput> = new BehaviorSubject<LoyalCustomerInput>({
    limit: 20,
    page: 1,
    order: OrderedEnum.DESC,
    orderedField: LoyalCustomerOrderedFieldsEnum.LastOrderDate,
  });

  isLoading$: Observable<boolean> = this.service.isLoading$;

  dateTimeFormat: string = DATE_TIME_FORMAT;
  nzPageSizeOptions: number[] = [10, 20, 30, 50];
  loyalCustomers$!: Observable<PageableLoyalCustomerDto>;

  checkedPage: boolean = false;
  setOfChecked: Set<string> = new Set<string>();
  items: LoyalCustomerDto[] = [];

  constructor(private readonly service: AnalyticsCustomersService) {}

  ngOnInit(): void {
    this.observeOnFilters();
  }

  observeOnFilters(): void {
    this.loyalCustomers$ = this.salesQuery.asObservable().pipe(
      untilDestroyed(this),
      distinctUntilChanged(),
      switchMap((query: LoyalCustomerInput): Observable<PageableLoyalCustomerDto> => this.service.loyalCustomers(query)),
      tap((value: PageableLoyalCustomerDto) => (this.items = value.items)),
    );
  }

  filterPatch({ storeId }: LoyalCustomerInput): void {
    const { limit, page, orderedField, order }: LoyalCustomerInput = this.salesQuery.getValue();

    this.salesQuery.next({
      limit,
      page,
      orderedField,
      order,
      ...(storeId && { storeId }),
    });
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sort: { key: string; value: NzTableSortOrder } | undefined = event.sort.find(
      ({ value }: { key: string; value: NzTableSortOrder }) => !!value,
    );

    const { order, orderedField, ...query }: LoyalCustomerInput = this.salesQuery.getValue();

    this.salesQuery.next({
      ...query,
      page: event.pageIndex,
      limit: event.pageSize,
      order: sort ? (sort?.value === 'ascend' ? OrderedEnum.ASC : OrderedEnum.DESC) : OrderedEnum.DESC,
      orderedField: sort ? (sort?.key as LoyalCustomerOrderedFieldsEnum) : LoyalCustomerOrderedFieldsEnum.LastOrderDate,
    });
  }

  onAllChecked(status: boolean): void {
    if (status) {
      for (const v of this.items) {
        v.customerId && this.setOfChecked.add(v.customerId);
      }
    } else {
      for (const v of this.items) {
        v.customerId && this.setOfChecked.delete(v.customerId);
      }
    }
  }

  onItemChecked(value: string, status: boolean): void {
    if (status) {
      this.setOfChecked.add(value);
    } else {
      this.setOfChecked.delete(value);
    }
  }
}
