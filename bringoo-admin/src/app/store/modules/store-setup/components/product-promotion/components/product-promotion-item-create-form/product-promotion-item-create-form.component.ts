import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { CrudProductLinkService } from '../../../../../../../../shared/api/auth/crud-product-link.service';
import { CrudProductPromotionItemService } from '../../../../../../../../shared/api/auth/crud-product-promotion-item.service';
import { FindNotUsedPromotionProductInput, ProductEntity, ProductLinkEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { Pageable } from '../../../../../../../../shared/interfaces/pageable';

@UntilDestroy()
@Component({
  selector: 'app-product-promotion-item-create-form',
  templateUrl: './product-promotion-item-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPromotionItemCreateComponent {
  _storeProductPromotionId!: string;

  @Input() set storeProductPromotionId(value: string | null | undefined) {
    if (value) {
      this._storeProductPromotionId = value;
      this.form.patchValue({ storeProductPromotionId: value });
    }
  }

  @Input() openPanel: boolean = false;
  @Output() onChangePanelStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  storeId: string = this.route.parent?.parent?.snapshot.params['id'];

  isLoading$: Observable<boolean> = this.crudProductLinkService.isLoading$ || this.crudStoreProductPromotionItemService.isLoading$;
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
    switchMap((search: FindNotUsedPromotionProductInput) => {
      if (!this._storeProductPromotionId) {
        return [];
      }

      search.storeProductPromotionId = this._storeProductPromotionId;

      return this.crudStoreProductPromotionItemService.findNotUsedPromotionProducts(search).pipe(
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
    private readonly crudStoreProductPromotionItemService: CrudProductPromotionItemService,
  ) {
    this.buildForm();
  }

  onSubmit(): void {
    this.crudStoreProductPromotionItemService.updateMany({ ids: [] }, this.form.value).subscribe(() => {
      this.productFilter.next({ ...this.productFilter.getValue() });
      this.setOfChecked.clear();
      this.onChangePanelStatus.emit(false);
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      productIds: [null],
      storeId: [this.storeId, [Validators.required]],
      storeProductPromotionId: [this.storeProductPromotionId, [Validators.required]],
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
