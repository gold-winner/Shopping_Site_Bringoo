import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

import { CrudCorporateService } from '../../../../../../shared/api/auth/crud-corporate.service';
import { CrudCurrencyService } from '../../../../../../shared/api/auth/crud-currency.service';
import { CrudStoreBrandService } from '../../../../../../shared/api/auth/crud-store-brand.service';
import { CrudStoreRegionService } from '../../../../../../shared/api/auth/crud-store-region.service';
import { CrudVendorCategoryService } from '../../../../../../shared/api/auth/crud-vendor-category.service';
import { CrudVendorTypeService } from '../../../../../../shared/api/auth/crud-vendor-type.service';
import {
  CorporateEntity,
  CurrencyEntity,
  I18NInput,
  StoreBrandEntity,
  StoreCreateInput,
  StoreRegionEntity,
  StoreStaffRestrictionEnum,
  VendorCategoryEntity,
  VendorTypeEntity,
} from '../../../../../../shared/api/auth/data-contracts';
import { TIME_ZONES } from '../../../../../../shared/config/time-zones.config';
import { DEFAULT_CURRENCY_CODE } from '../../../../../../shared/const/default-currency-code.const';
import { mlautsReplace } from '../../../../../../shared/helpers/mlauts-replacement';
import { SLUG_PATTERN } from '../../../../../../shared/helpers/slug-pattern';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-stores-create-form',
  templateUrl: './stores-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresCreateFormComponent extends DynamicForm<StoreCreateInput> implements OnInit {
  vendorType: SelectOptions<VendorTypeEntity> = {
    service: this.crudVendorTypeService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: VendorTypeEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  timeZones: string[] = TIME_ZONES;

  vendorCategory: SelectOptions<VendorCategoryEntity> = {
    service: this.crudVendorCategoryService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: VendorCategoryEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  corporateSelect: SelectOptions<CorporateEntity> = {
    service: this.crudCorporateService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: CorporateEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  currencySelect: SelectOptions<CurrencyEntity> = {
    service: this.crudCurrencyService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: CurrencyEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  storeBrandSelect: SelectOptions<StoreBrandEntity> = {
    service: this.crudStoreBrandService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: StoreBrandEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  storeRegionSelect: SelectOptions<StoreRegionEntity> = {
    service: this.crudStoreRegionService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: StoreRegionEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  defaultFormValue: Partial<StoreCreateInput> = {
    isActive: true,
    isPickup: true,
    isDelivery: true,
    isOnlineShipment: true,
    currencyCode: DEFAULT_CURRENCY_CODE,
    replacementAllowed: false,
    deliveryFeeVatCode: 'VAT_19',
  };

  storeStaffRestriction: StoreStaffRestrictionEnum[] = Object.values(StoreStaffRestrictionEnum);

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly crudVendorTypeService: CrudVendorTypeService,
    private readonly crudVendorCategoryService: CrudVendorCategoryService,
    private readonly crudCurrencyService: CrudCurrencyService,
    private readonly crudCorporateService: CrudCorporateService,
    private readonly crudStoreBrandService: CrudStoreBrandService,
    private readonly crudStoreRegionService: CrudStoreRegionService,
  ) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      name_public_short_i18n: [null, [Validators.required]],
      name_public_long_i18n: [null, [Validators.required]],
      timeZone: [null, [Validators.required]],
      code: [null, [Validators.required]],
      isActive: [null, [Validators.required]],
      replacementAllowed: [false, [Validators.required]],
      vendorTypeCode: [null, [Validators.required]],
      vendorCategoryCode: [null, [Validators.required]],
      currencyCode: [null, [Validators.required]],
      corporateCode: [null],
      storeBrandCode: [null],
      storeRegionCode: [null, [Validators.required]],
      logoUrl: [null, [Validators.required]],
      isPickup: [null, [Validators.required]],
      isDelivery: [null, [Validators.required]],
      isOnlineShipment: [null, [Validators.required]],
      slug: [null, [Validators.pattern(SLUG_PATTERN), Validators.required, Validators.maxLength(400), Validators.minLength(3)]],
      pickerRestriction: [StoreStaffRestrictionEnum.FREELANCE_ONLY, Validators.required],
      driverRestriction: [StoreStaffRestrictionEnum.FREELANCE_ONLY, Validators.required],
      deliveryFeeVatCode: [null, [Validators.required]],
      externalCode: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.autoSlug();
  }

  autoSlug(): void {
    this.form
      .get('name_i18n')
      ?.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((names: I18NInput) => {
        if (names?.EN) {
          const generatedSlag: string = mlautsReplace(names?.EN)
            .replace(/([\W_])+/g, '-')
            .toLowerCase();

          this.form.get('slug')?.patchValue(generatedSlag);
        }
      });
  }
}
