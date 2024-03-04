import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { CrudCorporateService } from '../../../../../../shared/api/auth/crud-corporate.service';
import { CrudCurrencyService } from '../../../../../../shared/api/auth/crud-currency.service';
import { CrudStoreService } from '../../../../../../shared/api/auth/crud-store.service';
import { CrudStoreBrandService } from '../../../../../../shared/api/auth/crud-store-brand.service';
import { CrudStoreRegionService } from '../../../../../../shared/api/auth/crud-store-region.service';
import { CrudVendorCategoryService } from '../../../../../../shared/api/auth/crud-vendor-category.service';
import { CrudVendorTypeService } from '../../../../../../shared/api/auth/crud-vendor-type.service';
import {
  CorporateEntity,
  CurrencyEntity,
  LangCodeEnum,
  StoreBrandEntity,
  StoreEntity,
  StoreRegionEntity,
  VendorCategoryEntity,
  VendorTypeEntity,
} from '../../../../../../shared/api/auth/data-contracts';
import { validateForm } from '../../../../../../shared/helpers/validate-form';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';
import { StoreDetailsService } from '../../../../services/store-details.service';

@UntilDestroy()
@Component({
  selector: 'app-store-basic-information-form',
  templateUrl: './store-basic-information-form.component.html',
  styleUrls: ['store-basic-information-form.component.scss'],
})
export class StoreBasicInformationFormComponent {
  form!: UntypedFormGroup;

  isLoading$: Observable<boolean> = this.service.isLoading$;
  storeName$: Observable<string> = this.storeDetailsBreadService.storeName$;

  storeInformation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  storeId: string;

  vendorTypes: SelectOptions<VendorTypeEntity> = {
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

  currencyCodes: SelectOptions<CurrencyEntity> = {
    service: this.crudCurrencyService,
    fields: ['name_i18n', 'code', 'symbol'],
    valueKey: 'code',
    getLabel(item: CurrencyEntity): string {
      return item.name_i18n ? `${item.name_i18n} (${item.symbol})` : '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['symbol', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
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

  storeRegion: SelectOptions<StoreRegionEntity> = {
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

  constructor(
    private fb: UntypedFormBuilder,
    private activeRoute: ActivatedRoute,
    private service: CrudStoreService,
    private crudVendorTypeService: CrudVendorTypeService,
    private crudVendorCategoryService: CrudVendorCategoryService,
    private crudCurrencyService: CrudCurrencyService,
    private crudCorporateService: CrudCorporateService,
    private readonly crudStoreBrandService: CrudStoreBrandService,
    private crudStoreRegionService: CrudStoreRegionService,
    private storeDetailsBreadService: StoreDetailsService,
    private readonly notification: NzNotificationService,
  ) {
    this.storeId = this.activeRoute.parent?.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.formBuild();
    this.getStoreInformation();
  }

  formBuild(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      name_public_short_i18n: [null, [Validators.required]],
      name_public_long_i18n: [null, [Validators.required]],
      isActive: [null, [Validators.required]],
      code: [null, [Validators.required]],
      vendorTypeCode: [null, [Validators.required]],
      vendorCategoryCode: [null, [Validators.required]],
      currencyCode: [null, [Validators.required]],
      corporateCode: [null],
      storeBrandCode: [null],
      logoUrl: [null, [Validators.required]],
      isPickup: [null, [Validators.required]],
      isDelivery: [null, [Validators.required]],
      isOnlineShipment: [null, [Validators.required]],
      isStartPickJobWithoutDriverAllowed: [null, [Validators.required]],
      storeRegionCode: [null, [Validators.required]],
      productOutOfStockTime: [null],
      deliveryFeeVatCode: [null, [Validators.required]],
      externalCode: [null],
    });
  }

  getStoreInformation(): void {
    this.storeInformation
      .pipe(
        untilDestroyed(this),
        filter(Boolean),
        switchMap(
          (): Observable<StoreEntity> =>
            this.service.findOne(this.storeId, { lang: LangCodeEnum.ALL, softDelete: true }).pipe(untilDestroyed(this)),
        ),
      )
      .subscribe((value: StoreEntity) => {
        this.form.patchValue(value);
      });
    this.storeInformation.next(true);
  }

  onSubmit(): void {
    validateForm(this.form);
    if (this.form.invalid) return;

    this.service
      .update(this.storeId, this.form.value)
      .subscribe(() => this.notification.success('Basic information', 'Successfully updated'));
  }

  onCancel(): void {
    this.storeInformation.next(true);
  }
}
