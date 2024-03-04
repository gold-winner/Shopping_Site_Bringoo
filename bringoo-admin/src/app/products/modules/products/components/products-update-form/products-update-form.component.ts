import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import cloneDeep from 'clone-deep';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pairwise, tap } from 'rxjs/operators';

import { CrudProductBrandService } from '../../../../../../shared/api/auth/crud-product-brand.service';
import { CrudProductCategoryService } from '../../../../../../shared/api/auth/crud-product-category.service';
import { CrudProductSubcategoryService } from '../../../../../../shared/api/auth/crud-product-subcategory.service';
import { CrudVatService } from '../../../../../../shared/api/auth/crud-vat.service';
import {
  ProductBrandEntity,
  ProductCategoryEntity,
  ProductDepositUpdateInput,
  ProductSubcategoryEntity,
  ProductTypeEnum,
  ProductUnitCodeEnum,
  ProductUpdateInput,
  VatEntity,
} from '../../../../../../shared/api/auth/data-contracts';
import { DECIMAL_PATTERN_CONFIG } from '../../../../../../shared/config/decimal-pattern.config';
import { DIMENSION_DEPENDS_CONFIG } from '../../../../../../shared/config/dimension-depends.config';
import { ProductMetaDataEnum } from '../../../../../../shared/enums/product-meta-data.enum';
import { mlautsReplace } from '../../../../../../shared/helpers/mlauts-replacement';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';
import { ProductsControlsConfigForm } from '../configs/controls-config.form';

@UntilDestroy()
@Component({
  selector: 'app-products-update-form',
  templateUrl: './products-update-form.component.html',
  styleUrls: ['../products-create-form/products-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsUpdateFormComponent extends DynamicForm<ProductUpdateInput> implements AfterViewInit {
  private readonly isReadySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isReady$: Observable<boolean> = this.isReadySubject.asObservable().pipe(debounceTime(200));
  nzTabBarStyle: Record<string, string> = { 'padding-left': '16px', 'margin': '0' };
  productMetaDataList: string[] = Object.values(ProductMetaDataEnum);
  deposit: FormControl = new FormControl(false);
  productUnitCode: string[] = Object.keys(ProductUnitCodeEnum);
  baseUnitCode: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(DIMENSION_DEPENDS_CONFIG.GRAM);
  patchedDeposit!: ProductDepositUpdateInput;
  decimalPattern: string = DECIMAL_PATTERN_CONFIG;
  productTypes: string[] = Object.keys(ProductTypeEnum);
  productTypeEnum: typeof ProductTypeEnum = ProductTypeEnum;
  defaultFormValue: any = {
    ageRestriction: null,
  };

  productAttributes: any;
  productId!: string;

  constructor(
    private fb: UntypedFormBuilder,
    private readonly vatService: CrudVatService,
    private readonly crudProductCategoryService: CrudProductCategoryService,
    private readonly crudProductSubcategoryService: CrudProductSubcategoryService,
    private readonly crudProductBrandService: CrudProductBrandService,
  ) {
    super();
    this.buildForm();
    this.onDepositSet();
    this.customAgeRestrictionSubscribe();
  }

  ngAfterViewInit(): void {
    this.isReadySubject.next(true);
  }

  beforeShow(): void {
    this.deposit.setValue(false);
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
    this.form = this.fb.group(ProductsControlsConfigForm);

    this.form.controls.productType.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged(), filter(Boolean))
      .subscribe(() => this.form.patchValue({ productAttributes: this.productAttributes }));

    this.form.controls.productAttributes.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged(), filter(Boolean))
      .subscribe((v: any) => (this.productAttributes = { ...this.productAttributes, ...v }));

    this.form.controls.productCategoryCode.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        pairwise<string>(),
        map(([previousValue, currentValue]: [string, string]) => {
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
        tap((v: string) => this.onChangeUnitCode(v)),
      )
      .subscribe();
  }

  onDepositSet(): void {
    this.deposit.valueChanges.pipe(untilDestroyed(this)).subscribe((isDeposit: boolean) => {
      if (isDeposit) {
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
        if (this.patchedDeposit) {
          this.form.get('deposit')?.patchValue({ ...this.patchedDeposit });
        }
      } else {
        this.form.removeControl('deposit');
        this.form.addControl('deposit', this.fb.control(null));
      }
    });
  }

  //TODO move to pipe
  codeAndSlugGenerator(names: any & { EN?: string }): void {
    if (names?.EN) {
      const generatedCode: string = mlautsReplace(names.EN)
        .replace(/([\W_])+/g, '_')
        .toUpperCase();
      const generatedSlag: string = mlautsReplace(names.EN)
        .replace(/([\W_])+/g, '-')
        .toUpperCase();
      this.form.patchValue({
        code: generatedCode,
        slug: generatedSlag,
      });
    } else {
      this.form.patchValue({
        code: null,
        slug: null,
      });
    }
  }

  beforePatch(value: ProductUpdateInput & { id: string }): ProductUpdateInput {
    this.productAttributes = value.productAttributes;
    this.productId = value.id;

    const patchValues: ProductUpdateInput & any = value;

    if (value.deposit) {
      this.deposit.patchValue(true);
      this.patchedDeposit = value.deposit;
    } else {
      this.deposit.patchValue(false);
    }
    if (patchValues.tags_i18n) {
      for (const lang in patchValues.tags_i18n) {
        patchValues.tags_i18n[lang] = patchValues.tags_i18n[lang] ? (patchValues.tags_i18n[lang] as string).split(',') : [];
      }
    }

    if (!value.isCustomAgeRestriction) {
      patchValues.ageRestriction = null;
    }

    return patchValues;
  }

  beforeSubmit(value: ProductUpdateInput): ProductUpdateInput {
    const formValues: ProductUpdateInput & any = cloneDeep(value);

    const tags: { [key: string]: string[] } = formValues.tags_i18n;

    if (!tags?.EN) {
      formValues.tags_i18n = null;
    } else {
      for (const lang in tags) {
        formValues.tags_i18n[lang] = tags[lang] ? tags[lang].join(',') : null;
      }
    }

    this.deposit.patchValue(false);
    this.productId = '';

    return formValues;
  }

  onChangeUnitCode(key: string): void {
    if (DIMENSION_DEPENDS_CONFIG[key]) {
      this.baseUnitCode.next(DIMENSION_DEPENDS_CONFIG[key]);
      this.form.patchValue({ baseUnitCode: DIMENSION_DEPENDS_CONFIG[key][0] });
    }
  }

  customAgeRestrictionSubscribe(): void {
    this.form
      .get('isCustomAgeRestriction')
      ?.valueChanges.pipe(
        untilDestroyed(this),
        filter((value: boolean) => !value),
        tap(() => this.form.patchValue({ ageRestriction: null })),
      )
      .subscribe();

    this.form
      .get('isCustomAgeRestriction')
      ?.valueChanges.pipe(
        untilDestroyed(this),
        filter((value: boolean) => value),
        tap(() => this.form.patchValue({ ageRestriction: 16 })),
      )
      .subscribe();
  }
}
