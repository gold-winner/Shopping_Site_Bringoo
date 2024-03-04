import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { AnalyticsSalesService } from '../../../../../../../../shared/api/auth/analytics-sales.service';
import {
  OrderedEnum,
  PageableProductRefund,
  ProductRefundDto,
  SalesProductRefundInput,
  SalesProductRefundOrderedFieldsEnum,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';

@UntilDestroy()
@Component({
  selector: 'app-products-refund',
  templateUrl: './products-refund.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsRefundComponent implements OnInit {
  salesQuery: BehaviorSubject<SalesProductRefundInput> = new BehaviorSubject<SalesProductRefundInput>({
    dateEnd: '',
    dateStart: '',
    limit: 20,
    page: 1,
    order: OrderedEnum.ASC,
    orderedField: SalesProductRefundOrderedFieldsEnum.RefundCount,
  });

  isLoading$: Observable<boolean> = this.service.isLoading$;

  dateTimeFormat: string = DATE_TIME_FORMAT;
  nzPageSizeOptions: number[] = [10, 20, 30, 50];
  productSales$!: Observable<PageableProductRefund>;

  checkedPage: boolean = false;
  setOfChecked: Set<string> = new Set<string>();
  items: ProductRefundDto[] = [];

  constructor(private readonly service: AnalyticsSalesService) {}

  ngOnInit(): void {
    this.observeOnFilters();
  }

  observeOnFilters(): void {
    this.productSales$ = this.salesQuery.asObservable().pipe(
      untilDestroyed(this),
      filter((query: SalesProductRefundInput) => !!query.dateEnd && !!query.dateStart),
      distinctUntilChanged(),
      switchMap((query: SalesProductRefundInput): Observable<PageableProductRefund> => this.service.getProductRefunds(query)),
      tap((productRefund: PageableProductRefund) => (this.items = productRefund.items)),
    );
  }

  filterPatch({ dateEnd, dateStart, name_i18n, categoryCode, subcategoryCode, storeId }: SalesProductRefundInput): void {
    const { limit, page, orderedField, order }: SalesProductRefundInput = this.salesQuery.getValue();

    this.salesQuery.next({
      limit,
      page,
      dateEnd,
      dateStart,
      orderedField,
      order,
      ...(storeId && { storeId }),
      ...(name_i18n && { name_i18n }),
      ...(categoryCode && { categoryCode }),
      ...(subcategoryCode && { subcategoryCode }),
    });
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sort: { key: string; value: NzTableSortOrder } | undefined = event.sort.find(
      ({ value }: { key: string; value: NzTableSortOrder }) => !!value,
    );

    const { order, orderedField, ...query }: SalesProductRefundInput = this.salesQuery.getValue();

    this.salesQuery.next({
      ...query,
      page: event.pageIndex,
      limit: event.pageSize,
      order: sort ? (sort?.value === 'ascend' ? OrderedEnum.ASC : OrderedEnum.DESC) : OrderedEnum.DESC,
      orderedField: sort ? (sort?.key as SalesProductRefundOrderedFieldsEnum) : SalesProductRefundOrderedFieldsEnum.RefundCount,
    });
  }

  onAllChecked(status: boolean): void {
    if (status) {
      for (const v of this.items) {
        v.productId && this.setOfChecked.add(v.productId);
      }
    } else {
      for (const v of this.items) {
        v.productId && this.setOfChecked.delete(v.productId);
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
