import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzTableQueryParams } from 'ng-zorro-antd/table/src/table.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { CrudProductService } from '../../../../../../../../shared/api/auth/crud-product.service';
import { CrudProductLinkService } from '../../../../../../../../shared/api/auth/crud-product-link.service';
import { FindUnlinkedProductsInput, ProductEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { Pageable } from '../../../../../../../../shared/interfaces/pageable';

@UntilDestroy()
@Component({
  selector: 'app-product-link-create-create-form',
  templateUrl: './store-product-link-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductLinkCreateFormComponent {
  @Input() openPanel: boolean = false;
  @Output() onChangePanelStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  storeId: string = this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'];

  isLoading$: Observable<boolean> = this.service.isLoading$;
  checked: boolean = false;
  setOfChecked: Set<string> = new Set<string>();

  nzPageSizeOptions: number[] = [20, 30, 50, 1000];

  form!: UntypedFormGroup;

  filterForm: UntypedFormGroup = this.fb.group({
    search: [null],
    productCategoryCode: [null],
    productSubcategoryCode: [null],
    productBrandCode: [null],
    productTags: [null],
  });

  limit = 20;
  total = 126;

  productFilter: BehaviorSubject<FindUnlinkedProductsInput> = new BehaviorSubject<FindUnlinkedProductsInput>({
    page: 1,
    limit: 20,
  });

  items: Observable<ProductEntity[] | undefined> = this.productFilter.asObservable().pipe(
    untilDestroyed(this),
    distinctUntilChanged(),
    switchMap((search: FindUnlinkedProductsInput) =>
      this.service.findUnlinkedProducts(this.storeId, search).pipe(
        filter((v: Pageable & { items?: ProductEntity[] }) => !!v?.items),
        tap((v: Pageable & { items?: ProductEntity[] }) => (this.total = v.total)),
        map((v: Pageable & { items?: ProductEntity[] }) => v.items),
      ),
    ),
  );

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.limit = params.pageSize;
    const search: FindUnlinkedProductsInput = {
      ...this.productFilter.getValue(),
      page: params.pageIndex,
      limit: params.pageSize,
    };
    this.productFilter.next(search);
  }

  onAllChecked(status: boolean, products: ProductEntity[]): void {
    for (const { id } of products) {
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
    private readonly fb: UntypedFormBuilder,
    public readonly service: CrudProductService,
    private readonly route: ActivatedRoute,
    private crudProductLinkService: CrudProductLinkService,
  ) {
    this.buildForm();
  }

  onSubmit(): void {
    this.crudProductLinkService.createMultiple(this.form.value).subscribe(() => {
      this.productFilter.next({ ...this.productFilter.getValue() });
      this.setOfChecked.clear();
      this.onChangePanelStatus.emit(false);
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      productIds: [null],
      storeId: [this.storeId, [Validators.required]],
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
