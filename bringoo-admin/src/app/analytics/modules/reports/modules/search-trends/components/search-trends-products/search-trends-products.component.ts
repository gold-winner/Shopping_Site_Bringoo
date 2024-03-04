import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

import { AnalyticsProductSearchService } from '../../../../../../../../shared/api/auth/analytics-product-search.service';
import {
  OrderedEnum,
  ProductSearchTermProductDto,
  ProductSearchTermProductInput,
  ProductSearchTermProductsDto,
} from '../../../../../../../../shared/api/auth/data-contracts';

@UntilDestroy()
@Component({
  selector: 'app-search-trends-products',
  templateUrl: './search-trends-products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTrendProductsComponent implements OnInit {
  private subscription!: Subscription;
  term: string = this.route.snapshot.params['term'];

  isAlcoholFilterStates: string[] = ['Show Alcohol', 'Hide Alcohol', 'Show ALL'];
  isBioFilterStates: string[] = ['Show Bio', 'Hide Bio', 'Show ALL'];
  isFrozenFilterStates: string[] = ['Show Frozen', 'Hide Frozen', 'Show ALL'];
  isTobaccoFilterStates: string[] = ['Show Tobacco', 'Hide Tobacco', 'Show ALL'];

  form: UntypedFormGroup = this.fb.group({
    term: [this.term],
    productName: [null],
    categoryCode: [null],
    subcategoryCode: [null],
    isAlcohol: ['Show ALL'],
    isBio: ['Show ALL'],
    isFrozen: ['Show ALL'],
    isTobacco: ['Show ALL'],
  });

  total: number = 1;
  page: number = 1;
  nzPageSizeOptions: number[] = [10, 20, 30, 50];
  limit: number = this.nzPageSizeOptions[0];
  order: OrderedEnum = OrderedEnum.DESC;
  orderedField: string | undefined;

  data: number[] = [1, 2, 3, 4, 5, 6, 10, 20];
  labels: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  items$: BehaviorSubject<ProductSearchTermProductDto[]> = new BehaviorSubject([] as ProductSearchTermProductDto[]);

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private analyticsProductSearchService: AnalyticsProductSearchService,
  ) {}

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
      .getProductSearchTermProduct(this.getFilters())
      .pipe(
        tap(({ items, total }: ProductSearchTermProductsDto) => {
          this.total = total;
          this.items$.next(items);
        }),
      )
      .subscribe();
  }

  getFilters(): ProductSearchTermProductInput {
    const {
      productName,
      subcategoryCode,
      term,
      isAlcohol,
      isBio,
      isFrozen,
      isTobacco,
    }: ProductSearchTermProductInput & any = this.form.value;

    return {
      term: term ?? '',
      limit: this.limit,
      page: this.page,
      ...(productName && { productName }),
      ...(subcategoryCode && { subcategoryCode }),
      ...(isAlcohol !== 'Show ALL' && { isAlcohol: isAlcohol === 'Show Alcohol' }),
      ...(isBio !== 'Show ALL' && { isBio: isBio === 'Show Bio' }),
      ...(isFrozen !== 'Show ALL' && { isFrozen: isFrozen === 'Show Frozen' }),
      ...(isTobacco !== 'Show ALL' && { isTobacco: isTobacco === 'Show Tobacco' }),
    };
  }
}
