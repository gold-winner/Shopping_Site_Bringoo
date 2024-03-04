import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';

import { AnalyticsSalesService } from '../../../../../../../../shared/api/auth/analytics-sales.service';
import {
  OrderedEnum,
  PageableAnalyticsSalesProducts,
  SalesProductsDto,
  SalesProductsInput,
  SalesProductsOrderedFieldsEnum,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';

@UntilDestroy()
@Component({
  selector: 'app-sales-products',
  templateUrl: './sales-products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesProductsComponent implements OnInit {
  salesQuery: BehaviorSubject<SalesProductsInput> = new BehaviorSubject<SalesProductsInput>({
    dateStart: '',
    dateEnd: '',
    limit: 10,
    page: 1,
    orderedField: SalesProductsOrderedFieldsEnum.LastSales,
    order: OrderedEnum.DESC,
  });

  isLoading$: Observable<boolean> = this.service.isLoading$;

  dateTimeFormat: string = DATE_TIME_FORMAT;
  nzPageSizeOptions: number[] = [10, 20, 30, 50];

  checkedPage: boolean = false;
  setOfChecked: Set<string> = new Set<string>();

  items: SalesProductsDto[] = [];
  total: number = 0;
  page: number = 1;

  constructor(private readonly service: AnalyticsSalesService) {}

  ngOnInit(): void {
    this.observeOnFilters();
  }

  observeOnFilters(): void {
    this.salesQuery
      .asObservable()
      .pipe(
        untilDestroyed(this),
        filter((query: SalesProductsInput) => !!query.dateEnd && !!query.dateStart),
        debounceTime(500),
        switchMap((query: SalesProductsInput): Observable<PageableAnalyticsSalesProducts> => this.service.getSalesByProducts(query)),
        tap(({ items, page, total }: PageableAnalyticsSalesProducts) => {
          this.items = items;
          this.page = page;
          this.total = total;
        }),
      )
      .subscribe();
  }

  filterPatch({ dateEnd, dateStart, name_i18n, categoryCode, subcategoryCode, storeId }: SalesProductsInput): void {
    const { limit, page, order, orderedField }: SalesProductsInput = this.salesQuery.getValue();
    this.salesQuery.next({
      limit,
      page,
      dateEnd,
      dateStart,
      order,
      orderedField,
      ...(name_i18n && { name_i18n }),
      ...(storeId && { storeId }),
      ...(categoryCode && { categoryCode }),
      ...(subcategoryCode && { subcategoryCode }),
    });
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sort: { key: string; value: NzTableSortOrder } | undefined = event.sort.find(
      ({ value }: { key: string; value: NzTableSortOrder }) => !!value,
    );

    const { orderedField, order, ...query }: SalesProductsInput = this.salesQuery.getValue();

    this.salesQuery.next({
      ...query,
      page: event.pageIndex,
      limit: event.pageSize,
      order: sort ? (sort?.value === 'ascend' ? OrderedEnum.ASC : OrderedEnum.DESC) : OrderedEnum.DESC,
      orderedField: sort ? (sort?.key as SalesProductsOrderedFieldsEnum) : SalesProductsOrderedFieldsEnum.LastSales,
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
