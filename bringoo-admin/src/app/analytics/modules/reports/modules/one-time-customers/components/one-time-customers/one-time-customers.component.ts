import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { AnalyticsCustomersService } from '../../../../../../../../shared/api/auth/analytics-customers.service';
import {
  OneTimeCustomerDto,
  OneTimeCustomerInput,
  OneTimeCustomerOrderedFieldsEnum,
  OrderedEnum,
  PageableOneTimeCustomersDto,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';

@UntilDestroy()
@Component({
  selector: 'app-one-time-customers',
  templateUrl: './one-time-customers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneTimeCustomersComponent implements OnInit {
  dateFormat: string = DATE_FORMAT;
  salesQuery: BehaviorSubject<OneTimeCustomerInput> = new BehaviorSubject<OneTimeCustomerInput>({
    dateEnd: '',
    dateStart: '',
    limit: 10,
    page: 1,
    order: OrderedEnum.DESC,
    orderedField: OneTimeCustomerOrderedFieldsEnum.PurchaseDate,
  });

  isLoading$: Observable<boolean> = this.service.isLoading$;

  dateTimeFormat: string = DATE_TIME_FORMAT;
  nzPageSizeOptions: number[] = [10, 20, 30, 50];
  oneTimeCustomers$!: Observable<PageableOneTimeCustomersDto>;

  checkedPage: boolean = false;
  setOfChecked: Set<string> = new Set<string>();
  items: OneTimeCustomerDto[] = [];

  constructor(private readonly service: AnalyticsCustomersService) {}

  ngOnInit(): void {
    this.observeOnFilters();
  }

  observeOnFilters(): void {
    this.oneTimeCustomers$ = this.salesQuery.asObservable().pipe(
      untilDestroyed(this),
      filter((query: OneTimeCustomerInput) => !!query.dateEnd && !!query.dateStart),
      distinctUntilChanged(),
      switchMap((query: OneTimeCustomerInput): Observable<PageableOneTimeCustomersDto> => this.service.oneTimeCustomers(query)),
      tap((oneTimeCustomersDto: PageableOneTimeCustomersDto) => (this.items = oneTimeCustomersDto.items)),
    );
  }

  filterPatch({ dateEnd, dateStart, itemsPurchased, totalRevenue, search, storeId }: OneTimeCustomerInput): void {
    const { limit, page, orderedField, order }: OneTimeCustomerInput = this.salesQuery.getValue();

    this.salesQuery.next({
      limit,
      page,
      dateEnd,
      dateStart,
      orderedField,
      order,
      ...(storeId && { storeId }),
      ...(itemsPurchased && { itemsPurchased }),
      ...(totalRevenue && { totalRevenue }),
      ...(search && { search }),
    });
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sort: { key: string; value: NzTableSortOrder } | undefined = event.sort.find(
      ({ value }: { key: string; value: NzTableSortOrder }) => !!value,
    );

    const { order, orderedField, ...query }: OneTimeCustomerInput = this.salesQuery.getValue();

    this.salesQuery.next({
      ...query,
      page: event.pageIndex,
      limit: event.pageSize,
      order: sort ? (sort?.value === 'ascend' ? OrderedEnum.ASC : OrderedEnum.DESC) : OrderedEnum.DESC,
      orderedField: sort ? (sort?.key as OneTimeCustomerOrderedFieldsEnum) : OneTimeCustomerOrderedFieldsEnum.CustomerName,
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
