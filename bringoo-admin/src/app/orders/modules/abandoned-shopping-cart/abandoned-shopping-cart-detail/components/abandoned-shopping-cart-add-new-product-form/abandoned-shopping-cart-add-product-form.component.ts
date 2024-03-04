import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { CrudProductLinkService } from '../../../../../../../shared/api/auth/crud-product-link.service';
import { CartDto, CartItemDto, Pageable, ProductLinkEntity, ProductsInput } from '../../../../../../../shared/api/auth/data-contracts';
import { ToFormGroupType } from '../../../../../../../shared/types/to-form-group.type';

@UntilDestroy()
@Component({
  selector: 'app-abandoned-shopping-cart-add-product-form',
  templateUrl: './abandoned-shopping-cart-add-product-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbandonShoppingCartAddProductFormComponent {
  @Input() set submit(symbol: symbol | undefined) {
    if (symbol) {
      this.onSubmit();
    }
  }

  @Input() set cartDetailsInfo(cartDetails: CartDto) {
    this.cartDetails = cartDetails;
    this.filterForm.patchValue(this.filterForm.value);
  }

  @Input() customerId!: string;

  @Output() formSubmit: EventEmitter<ProductsInput> = new EventEmitter<ProductsInput>();

  productFilter: BehaviorSubject<any> = new BehaviorSubject<any>({
    page: 1,
    limit: 20,
  });

  cartDetails!: CartDto;
  isLoading$: Observable<boolean> = this.crudProductLinkService.isLoading$;
  checked: boolean = false;
  setOfChecked: Set<string> = new Set<string>();
  nzPageSizeOptions: number[] = [20, 30, 50];

  form = new FormGroup<ToFormGroupType<{ productLinkIds: string[] }>>({
    productLinkIds: new FormControl(null),
  });

  limit = 20;
  total = 0;

  filterForm = new FormGroup<
    ToFormGroupType<{
      search: string;
      productCategoryCode: string;
      productSubcategoryCode: string;
      productBrandCode: string;
    }>
  >({
    search: new FormControl(null),
    productCategoryCode: new FormControl(null),
    productSubcategoryCode: new FormControl(null),
    productBrandCode: new FormControl(null),
  });

  items: Observable<ProductLinkEntity[]> = this.productFilter.asObservable().pipe(
    untilDestroyed(this),
    switchMap((productFilter: any) => {
      const $and: { [p: string]: any }[] = [];

      $and.push({ storeId: this.cartDetails.store.id });

      if (this.cartDetails.items.length > 0) {
        $and.push({ id: { $notin: this.cartDetails.items.map(({ linkId }: CartItemDto) => linkId) } });
      }

      if (productFilter.search) {
        $and.push({
          $or: [
            {
              'product.name_i18n': { $contL: productFilter.search },
            },
            {
              'product.productBrand.name_i18n': { $contL: productFilter.search },
            },
            {
              'product.category.name_i18n': { $contL: productFilter.search },
            },
            {
              'product.subcategory.name_i18n': { $contL: productFilter.search },
            },
          ],
        });
      }

      if (productFilter.productCategoryCode) {
        $and.push({ 'product.productCategoryCode': productFilter.productCategoryCode });
      }

      if (productFilter.productSubcategoryCode) {
        $and.push({ 'product.productSubcategoryCode': productFilter.productSubcategoryCode });
      }

      if (productFilter.productBrandCode) {
        $and.push({ 'product.productBrandCode': productFilter.productBrandCode });
      }

      return this.crudProductLinkService
        .find({
          s: JSON.stringify({ $and }),
          join: ['product', 'product.productBrand', 'product.category', 'product.subcategory'],
          limit: productFilter.limit,
          page: productFilter.page,
        })
        .pipe(
          tap((v: Pageable & { items?: ProductLinkEntity[] }) => (this.total = v.total)),
          map((v: Pageable & { items?: ProductLinkEntity[] }) => v?.items || []),
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

  isAvailableForCheck(item: ProductLinkEntity): boolean {
    return !!(item.product && item.product.isActive && item.product.category?.isActive && item.product.subcategory?.isActive);
  }

  onAllChecked(status: boolean, products: ProductLinkEntity[]): void {
    for (const product of products) {
      status ? this.setOfChecked.add(product.id) : this.setOfChecked.delete(product.id);

      if (!this.isAvailableForCheck(product)) {
        this.setOfChecked.delete(product.id);
      }
    }

    this.form.patchValue({ productLinkIds: [...this.setOfChecked] });
  }

  onItemChecked(id: string, status: boolean): void {
    if (status) {
      this.setOfChecked.add(id);
    } else {
      this.setOfChecked.delete(id);
    }
    this.form.patchValue({ productLinkIds: [...this.setOfChecked] });
  }

  constructor(private readonly crudProductLinkService: CrudProductLinkService) {
    this.buildForm();
  }

  onSubmit(): void {
    const productLinkIds: string[] | null | undefined = this.form.value.productLinkIds;
    if (this.customerId && productLinkIds) {
      this.formSubmit.next({
        customerId: this.customerId,
        productInputs: productLinkIds.map((linkId: string) => ({ linkId, count: 1 })),
      });
    }
  }

  buildForm(): void {
    this.filterForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(({ search, productCategoryCode, productSubcategoryCode, productBrandCode }: typeof this.filterForm.value) => {
        this.productFilter.next({
          ...(search && { search }),
          ...(productCategoryCode && { productCategoryCode }),
          ...(productSubcategoryCode && { productSubcategoryCode }),
          ...(productBrandCode && { productBrandCode }),
          limit: this.limit,
          page: 1,
        });
      });
  }
}
