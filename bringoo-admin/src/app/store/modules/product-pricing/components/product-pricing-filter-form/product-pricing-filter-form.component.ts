import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { CrudProductBrandService } from '../../../../../../shared/api/auth/crud-product-brand.service';
import { CrudProductCategoryService } from '../../../../../../shared/api/auth/crud-product-category.service';
import { CrudProductSubcategoryService } from '../../../../../../shared/api/auth/crud-product-subcategory.service';
import { CrudStoreService } from '../../../../../../shared/api/auth/crud-store.service';
import {
  FindInput,
  PriceTypeEnum,
  ProductBrandEntity,
  ProductCategoryEntity,
  ProductSubcategoryEntity,
  StoreEntity,
} from '../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';
import { BreadCrumbService } from '../../../../../../shared/services/bread-crumb.service';

type filters = {
  search?: string;
  category?: string;
  subCategory?: string;
  isDeposit?: 'Show deposits' | 'Hide deposits' | 'Show ALL';
};

@UntilDestroy()
@Component({
  selector: 'app-product-pricing-filter-form',
  templateUrl: './product-pricing-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPricingFilterFormComponent implements OnInit {
  form!: UntypedFormGroup;
  storeId: string;
  @Output() query: EventEmitter<FindInput> = new EventEmitter<FindInput>();
  pricingTypeList: string[] = Object.keys(PriceTypeEnum);

  categorySelect: SelectOptions<ProductCategoryEntity> = {
    service: this.crudProductCategoryService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: ProductCategoryEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  subCategorySelect: SelectOptions<ProductSubcategoryEntity> = {
    service: this.crudProductSubcategoryService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: ProductSubcategoryEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  brandSelect: SelectOptions<ProductBrandEntity> = {
    service: this.crudProductBrandService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: ProductBrandEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(
    private fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly breadCrumbService: BreadCrumbService,
    private readonly crudStoreService: CrudStoreService,
    private readonly crudProductCategoryService: CrudProductCategoryService,
    private readonly crudProductSubcategoryService: CrudProductSubcategoryService,
    private readonly crudProductBrandService: CrudProductBrandService,
  ) {
    this.buildForm();
    this.storeId = this.route.snapshot.params['id'];
    this.setBreadCrumbs();
  }

  ngOnInit(): void {
    this.mapSearch({});
  }

  setBreadCrumbs(): void {
    this.crudStoreService
      .findOne(this.storeId, { fields: 'name_i18n' })
      .pipe(untilDestroyed(this))
      .subscribe((store: StoreEntity) =>
        this.breadCrumbService.addBreadCrumbs([
          {
            path: `../${this.storeId}`,
            title: store.name_i18n ?? 'Store',
          },
        ]),
      );
  }

  buildForm(): void {
    this.form = this.fb.group({
      search: [null],
      category: [null],
      subCategory: [null],
      brand: [null],
      isDeposit: ['Show ALL'],
      dateStart: [null],
      dateEnd: [null],
      type: [null],
    });

    this.form.controls.category.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        map((v: string) => {
          this.form.patchValue({ subCategory: null });
          this.subCategorySelect = v
            ? {
                ...this.subCategorySelect,
                filter: [['categoryCode', CondOperator.EQUALS, v].join('||')],
              }
            : { ...this.subCategorySelect, filter: [] };
          return v;
        }),
      )
      .subscribe();

    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe((v: filters) => this.mapSearch(v));
  }

  private createDefaultFilters({ category, subCategory }: filters): { [p: string]: any }[] {
    const $and: { [p: string]: any }[] = [];
    if (category) {
      $and.push({ productCategoryCode: category });
    }
    if (subCategory) {
      $and.push({ productSubcategoryCode: subCategory });
    }
    return $and;
  }

  private mapSearch(filters: filters): void {
    if (!filters.search) {
      this.query.emit({
        s: JSON.stringify({
          $and: [{ storeId: this.route.snapshot.params['id'] }, ...this.createDefaultFilters(filters)],
        }),
      });
      return;
    }
    const str: string = JSON.stringify({
      $and: [
        { storeId: this.route.snapshot.params['id'] },
        ...this.createDefaultFilters(filters),
        {
          $or: [
            {
              name_i18n: { $contL: filters.search },
            },
          ],
        },
      ],
    });
    this.query.emit({ s: str });
  }
}
