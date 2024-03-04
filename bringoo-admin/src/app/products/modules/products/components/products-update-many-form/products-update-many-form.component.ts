import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import cloneDeep from 'clone-deep';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map, pairwise } from 'rxjs/operators';

import { CrudProductBrandService } from '../../../../../../shared/api/auth/crud-product-brand.service';
import { CrudProductCategoryService } from '../../../../../../shared/api/auth/crud-product-category.service';
import { CrudProductSubcategoryService } from '../../../../../../shared/api/auth/crud-product-subcategory.service';
import { CrudVatService } from '../../../../../../shared/api/auth/crud-vat.service';
import {
  ProductBrandEntity,
  ProductCategoryEntity,
  ProductSubcategoryEntity,
  ProductTypeEnum,
  ProductUnitCodeEnum,
  ProductUpdateManyInput,
  VatEntity,
} from '../../../../../../shared/api/auth/data-contracts';
import { DIMENSION_DEPENDS_CONFIG } from '../../../../../../shared/config/dimension-depends.config';
import { requiredIfValidator } from '../../../../../../shared/helpers/validate-form';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-products-update-many-form',
  templateUrl: './products-update-many-form.component.html',
  styleUrls: ['products-update-many-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsUpdateManyFormComponent extends DynamicForm<ProductUpdateManyInput> {
  deposit: FormControl = new FormControl(null);
  productUnitCode: string[] = Object.keys(ProductUnitCodeEnum);
  baseUnitCode: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(DIMENSION_DEPENDS_CONFIG.GRAM);
  isProductCategoryCodeSelected$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
  checkboxesClicked: Record<string, boolean> = {};
  fieldsToRemove: string[] = [];
  productTypeEnum: typeof ProductTypeEnum = ProductTypeEnum;
  productTypes: string[] = Object.values(ProductTypeEnum);
  productAttributes: any = {};

  constructor(
    private fb: FormBuilder,
    private readonly vatService: CrudVatService,
    private readonly crudProductCategoryService: CrudProductCategoryService,
    private readonly crudProductSubcategoryService: CrudProductSubcategoryService,
    private readonly crudProductBrandService: CrudProductBrandService,
  ) {
    super();
    this.buildForm();
  }

  checkboxClick(key: string): void {
    this.checkboxesClicked[key] = true;
  }

  productIsActiveSelect: Array<Record<string, any>> = [
    { label: "Don't change", value: null },
    { label: 'Active', value: true },
    { label: 'Not-active', value: false },
  ];

  productDepositSelect: Array<Record<string, any>> = [
    { label: "Don't change", value: null },
    { label: 'Change', value: 'change' },
    { label: 'Remove', value: 'remove' },
  ];

  productDepositOnChange(value: string | null): void {
    value === 'remove'
      ? this.fieldsToRemove.push('deposit')
      : (this.fieldsToRemove = this.fieldsToRemove.filter((i: string) => i !== 'deposit'));
  }

  vatCodeSelect: SelectOptions<VatEntity> = {
    service: this.vatService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: VatEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  productCategoryCode: SelectOptions<ProductCategoryEntity> = {
    service: this.crudProductCategoryService,
    fields: ['name_i18n', 'code', 'vendorCategoryCode'],
    valueKey: 'code',
    getLabel(item: ProductCategoryEntity): string {
      return `${item.name_i18n} (${item.vendorCategoryCode})`;
    },
    sort: ['name_i18n,ASC'],
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['vendorCategoryCode', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  productSubcategoryCode: SelectOptions<ProductSubcategoryEntity> = {
    service: this.crudProductSubcategoryService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: ProductSubcategoryEntity): string {
      return item.name_i18n || '---';
    },
    sort: ['name_i18n,ASC'],
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  productBrandCode: SelectOptions<ProductBrandEntity> = {
    service: this.crudProductBrandService,
    fields: ['name_i18n', 'code'],
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

  buildForm(): void {
    this.form = this.fb.group({
      isActive: [null],
      isAlcohol: [null],
      isCustomAgeRestriction: [null],
      ageRestriction: [null],
      isPickup: [null],
      isPickAndDrive: [null],
      isOnlineShipment: [null],
      isPublic: [null],
      isBio: [null],
      isFrozen: [null],
      isTobacco: [null],
      isVegan: [null],
      isVegetarian: [null],
      isGlutenFree: [null],
      isLactoseFree: [null],
      isFairTrade: [null],
      productBrandCode: [null],
      productCategoryCode: [null],
      productSubcategoryCode: [null, requiredIfValidator(() => this.form.get('productCategoryCode')?.value)],
      weight: [null],
      productUnitCode: [null],
      baseUnitCode: [null],
      productMeasurement: [null],
      baseMeasurement: [null],
      defaultPrice: [null],
      costPrice: [null],
      chargeTax: [null],
      vatCode: [null],
      deposit: [null],
      tags_i18n: [null],
      tags_i18n_add: [null],
      productType: [null],
      productAttributes: [null],
      isConsultationRecommended: [null],
      productLegalCode: [null],
    });

    this.form.controls.productCategoryCode.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        pairwise<string>(),
        map(([previousValue, currentValue]: [string, string]) => {
          this.isProductCategoryCodeSelected$.next(!!currentValue);

          if (previousValue !== null) {
            this.form.patchValue({ productSubcategoryCode: null });
          }
          if (currentValue !== null) {
            this.productSubcategoryCode = {
              ...this.productSubcategoryCode,
              filter: [['categoryCode', CondOperator.EQUALS, currentValue].join('||')],
            };
          }
          return currentValue;
        }),
      )
      .subscribe();

    this.form.controls.productUnitCode.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        map((v: string) => {
          this.onChangeUnitCode(v);
          return v;
        }),
      )
      .subscribe();

    this.deposit.valueChanges.pipe(untilDestroyed(this)).subscribe((isDeposit: any) => {
      if (isDeposit && isDeposit !== 'remove') {
        this.form.removeControl('deposit');
        this.form.addControl(
          'deposit',
          this.fb.group({
            itemVatCode: [null, [Validators.required]],
            itemDepositValueGross: [null, [Validators.required]],
            boxVatCode: [null, [Validators.required]],
            boxDepositValueGross: [null, [Validators.required]],
          }),
        );
      } else {
        this.form.removeControl('deposit');
        this.form.addControl('deposit', this.fb.control(null));
      }
    });
  }

  onAlcoholChecked(isAlcohol: boolean): void {
    if (!isAlcohol) {
      this.form.patchValue({ alcoholValue: 0 });
    }
  }

  onCustomAgeRestrictionChecked(isCustomAgeRestriction: boolean): void {
    if (isCustomAgeRestriction) {
      this.form.patchValue({ ageRestriction: 16 });
    }
    if (!isCustomAgeRestriction) {
      this.form.patchValue({ ageRestriction: null });
    }
  }

  beforePatch(value: ProductUpdateManyInput): ProductUpdateManyInput {
    const patchValues: ProductUpdateManyInput & any = value;
    this.deposit.patchValue(!!value.deposit);

    if (patchValues.tags_i18n) {
      for (const lang in patchValues.tags_i18n) {
        if (patchValues.tags_i18n[lang]) {
          patchValues.tags_i18n[lang] = (patchValues.tags_i18n[lang] as string).split(',');
        }
      }
    }

    if (patchValues.tags_i18n_add) {
      for (const lang in patchValues.tags_i18n_add) {
        if (patchValues.tags_i18n_add[lang]) {
          patchValues.tags_i18n_add[lang] = (patchValues.tags_i18n_add[lang] as string).split(',');
        }
      }
    }

    return patchValues;
  }

  beforeShow(): void {
    this.deposit.setValue(null);
    this.checkboxesClicked = {};
    this.fieldsToRemove = [];
  }

  beforeSubmit(value: ProductUpdateManyInput): ProductUpdateManyInput {
    const formValues: ProductUpdateManyInput & any = cloneDeep(value);

    if (!formValues.tags_i18n?.EN) {
      formValues.tags_i18n = null;
    } else {
      for (const lang in formValues.tags_i18n) {
        if (formValues.tags_i18n[lang]) {
          formValues.tags_i18n[lang] = (formValues.tags_i18n[lang] as string[])?.join(',');
        } else {
          formValues.tags_i18n[lang] = null;
        }
      }
    }

    if (formValues.tags_i18n_add && Object.keys(formValues.tags_i18n_add).some((lang: string) => !!formValues.tags_i18n_add[lang])) {
      for (const lang in formValues.tags_i18n_add) {
        if (formValues.tags_i18n_add[lang]) {
          formValues.tags_i18n_add[lang] = (formValues.tags_i18n_add[lang] as string[])?.join(',');
        } else {
          formValues.tags_i18n_add[lang] = null;
        }
      }
    } else {
      formValues.tags_i18n_add = null;
    }

    // eslint-disable-next-line unicorn/prefer-object-from-entries
    return Object.keys(formValues).reduce((acc: any, i: string) => {
      if (this.fieldsToRemove.includes(i)) {
        acc[i] = null;
      } else if (formValues[i] !== null) {
        acc[i] = formValues[i];
      }

      return acc;
    }, {});
  }

  onChangeUnitCode(key: string): void {
    if (DIMENSION_DEPENDS_CONFIG[key]) {
      this.baseUnitCode.next(DIMENSION_DEPENDS_CONFIG[key]);
      this.form.patchValue({ baseUnitCode: DIMENSION_DEPENDS_CONFIG[key][0] });
    }
  }
}
