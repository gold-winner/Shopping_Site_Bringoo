import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

import { AnalyticsProductSearchService } from '../../../../../../../../shared/api/auth/analytics-product-search.service';
import { OrderedEnum, ProductSearchTermDto, ProductSearchTermsDto } from '../../../../../../../../shared/api/auth/data-contracts';

@UntilDestroy()
@Component({
  selector: 'app-search-trends',
  templateUrl: './search-trends.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTrendsComponent implements OnInit {
  private subscription!: Subscription;

  form: UntypedFormGroup = this.fb.group({
    term: [null],
    countryCode: [null],
    storeId: [null],
  });

  total: number = 1;
  page: number = 1;
  nzPageSizeOptions: number[] = [10, 20, 30, 50];
  limit: number = this.nzPageSizeOptions[0];
  order: OrderedEnum = OrderedEnum.DESC;
  orderedField: string | undefined;

  data: number[] = [1, 2, 3, 4, 5, 6, 10, 20];
  labels: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  items$: BehaviorSubject<ProductSearchTermDto[]> = new BehaviorSubject([] as ProductSearchTermDto[]);

  constructor(private readonly fb: UntypedFormBuilder, private analyticsProductSearchService: AnalyticsProductSearchService) {}

  ngOnInit(): void {
    this.subscription = this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        tap(() => this.loadItems()),
      )
      .subscribe();
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sort: { key: string; value: NzTableSortOrder } | undefined = event.sort.find(
      ({ value }: { key: string; value: NzTableSortOrder }) => !!value,
    );

    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.order = sort ? (sort?.value === 'ascend' ? OrderedEnum.ASC : OrderedEnum.DESC) : OrderedEnum.DESC;
    this.orderedField = sort?.key;

    this.loadItems();
  }

  loadItems(): void {
    this.analyticsProductSearchService
      .getProductSearchTerm(
        this.clean({
          ...this.form.value,
          limit: this.limit,
          page: this.page,
        }),
      )
      .pipe(
        tap(({ items, total }: ProductSearchTermsDto) => {
          this.total = total;
          this.items$.next(items);
        }),
      )
      .subscribe();
  }

  clean(obj: any): any {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  }
}
