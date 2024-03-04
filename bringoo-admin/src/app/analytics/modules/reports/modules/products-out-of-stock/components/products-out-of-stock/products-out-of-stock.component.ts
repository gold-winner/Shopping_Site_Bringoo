import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzTableQueryParams } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { AnalyticsSalesService } from '../../../../../../../../shared/api/auth/analytics-sales.service';
import { PageableProductsOutOfStockDto, ProductsOutOfStockInput } from '../../../../../../../../shared/api/auth/data-contracts';

@UntilDestroy()
@Component({
  selector: 'app-products-refund',
  templateUrl: './products-out-of-stock.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsOutOfStockComponent implements OnInit {
  outOfStockInput: BehaviorSubject<ProductsOutOfStockInput> = new BehaviorSubject<ProductsOutOfStockInput>({
    dateStart: '',
    dateEnd: '',
    limit: 10,
    page: 1,
  });

  nzPageSizeOptions: number[] = [10, 20, 30, 50];

  productsOutOfStock$!: Observable<PageableProductsOutOfStockDto>;
  isLoading$: Observable<boolean> = this.service.isLoading$;

  constructor(private readonly service: AnalyticsSalesService) {}

  ngOnInit(): void {
    this.productsOutOfStock$ = this.outOfStockInput.asObservable().pipe(
      filter(({ dateStart, dateEnd }: ProductsOutOfStockInput) => !!(dateStart && dateEnd)),
      switchMap((query: ProductsOutOfStockInput): Observable<PageableProductsOutOfStockDto> => this.service.productsOutOfStock(query)),
    );
  }

  onQueryParamsChange({ pageSize, pageIndex }: NzTableQueryParams): void {
    this.outOfStockInput.next({
      ...this.outOfStockInput.getValue(),
      page: pageIndex,
      limit: pageSize,
    });
  }

  filtersUpdate({ search, storeId, dateStart, dateEnd }: { storeId: string; search: string; dateStart: string; dateEnd: string }): void {
    const { page, limit }: ProductsOutOfStockInput = this.outOfStockInput.getValue();

    this.outOfStockInput.next({
      page,
      limit,
      dateEnd,
      dateStart,
      ...(storeId && { storeId }),
      ...(search && { search }),
    });
  }
}
