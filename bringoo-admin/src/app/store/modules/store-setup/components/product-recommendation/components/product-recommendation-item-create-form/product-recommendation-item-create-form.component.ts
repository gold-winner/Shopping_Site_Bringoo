import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { CrudProductLinkService } from '../../../../../../../../shared/api/auth/crud-product-link.service';
import { CrudProductRecommendationItemService } from '../../../../../../../../shared/api/auth/crud-product-recommendation-item.service';
import {
  FindNotUsedRecommendationProductsInput,
  ProductEntity,
  ProductLinkEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { Pageable } from '../../../../../../../../shared/interfaces/pageable';

@UntilDestroy()
@Component({
  selector: 'app-product-recommendation-item-create-form',
  templateUrl: './product-recommendation-item-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRecommendationItemCreateComponent {
  _storeProductRecommendationId!: string;

  @Input() set storeProductRecommendationId(value: string | null | undefined) {
    if (value) {
      this._storeProductRecommendationId = value;
      this.form.patchValue({ storeProductRecommendationId: value });
    }
  }

  @Input() openPanel: boolean = false;
  @Output() onChangePanelStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  storeId: string = this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'];

  isLoading$: Observable<boolean> = this.crudProductLinkService.isLoading$ || this.crudStoreProductRecommendationItemService.isLoading$;
  checked: boolean = false;
  setOfChecked: Set<string> = new Set<string>();

  nzPageSizeOptions: number[] = [20, 30, 50, 1000];

  form!: FormGroup;

  filterForm: FormGroup = this.fb.group({
    search: [null],
    productCategoryCode: [null],
    productSubcategoryCode: [null],
    productBrandCode: [null],
    productTags: [null],
  });

  limit = 20;
  total = 126;

  productFilter: BehaviorSubject<any> = new BehaviorSubject<any>({
    page: 1,
    limit: 20,
    storeId: this.storeId,
  });

  items: Observable<ProductEntity[]> = this.productFilter.asObservable().pipe(
    untilDestroyed(this),
    distinctUntilChanged(),
    switchMap((search: FindNotUsedRecommendationProductsInput) => {
      if (!this._storeProductRecommendationId) {
        return [];
      }

      search.storeProductRecommendationId = this._storeProductRecommendationId;

      return this.crudStoreProductRecommendationItemService.findNotUsedRecommendationProducts(search).pipe(
        filter((v: Pageable & { items?: ProductEntity[] }) => !!v?.items),
        tap((v: Pageable & { items?: ProductEntity[] }) => (this.total = v.total)),
        map((v: Pageable & { items?: ProductEntity[] }) => v.items || []),
      );
    }),
  );

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.limit = params.pageSize;
    const search: any = {
      ...this.productFilter.getValue(),
      page: params.pageIndex,
      limit: params.pageSize,
    };
    this.productFilter.next(search);
  }

  onAllChecked(status: boolean, productLinks: ProductLinkEntity[]): void {
    for (const { id } of productLinks) {
      status ? this.setOfChecked.add(id) : this.setOfChecked.delete(id);
    }
    this.form.patchValue({ productIds: [...this.setOfChecked] });
  }

  onItemChecked(id: string, status: boolean): void {
    if (status) {
      this.setOfChecked.add(id);
    } else {
      this.setOfChecked.delete(id);
    }
    this.form.patchValue({ productIds: [...this.setOfChecked] });
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly crudProductLinkService: CrudProductLinkService,
    private readonly crudStoreProductRecommendationItemService: CrudProductRecommendationItemService,
  ) {
    this.buildForm();
  }

  onSubmit(): void {
    this.crudStoreProductRecommendationItemService.updateMany({ ids: [] }, this.form.value).subscribe(() => {
      this.productFilter.next({ ...this.productFilter.getValue() });
      this.setOfChecked.clear();
      this.onChangePanelStatus.emit(false);
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      productIds: [null],
      storeId: [this.storeId, [Validators.required]],
      storeProductRecommendationId: [this.storeProductRecommendationId, [Validators.required]],
    });

    this.filterForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(
        ({
          search,
          productCategoryCode,
          productSubcategoryCode,
          productBrandCode,
          productTags,
        }: {
          search: string;
          productCategoryCode: string;
          productSubcategoryCode: string;
          productBrandCode: string;
          productTags: string;
        }) => {
          this.productFilter.next({
            ...(search && { search }),
            ...(productCategoryCode && { productCategoryCode }),
            ...(productSubcategoryCode && { productSubcategoryCode }),
            ...(productBrandCode && { productBrandCode }),
            ...(productTags && { productTags }),
            limit: this.limit,
            page: 1,
          });
        },
      );
  }

  onCloseDrawer(): void {
    this.onChangePanelStatus.emit(false);
  }
}
