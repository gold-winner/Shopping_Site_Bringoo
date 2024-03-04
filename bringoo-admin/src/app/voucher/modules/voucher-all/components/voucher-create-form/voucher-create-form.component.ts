import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { differenceInCalendarDays } from 'date-fns';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { AppManagerVoucherService } from '../../../../../../shared/api/auth/app-manager-voucher.service';
import { CrudCorporateService } from '../../../../../../shared/api/auth/crud-corporate.service';
import { CrudCustomerService } from '../../../../../../shared/api/auth/crud-customer.service';
import { CrudStoreService } from '../../../../../../shared/api/auth/crud-store.service';
import { CrudStoreBrandService } from '../../../../../../shared/api/auth/crud-store-brand.service';
import {
  CorporateEntity,
  CustomerEntity,
  CustomerRoleEnum,
  StoreBrandEntity,
  StoreEntity,
  VoucherCodeDto,
  VoucherCountryEligibilityEnum,
  VoucherCreateInput,
  VoucherCustomerEligibilityEnum,
  VoucherProductEligibilityEnum,
  VoucherRequirementsEnum,
  VoucherStoreEligibilityEnum,
  VoucherTypeEnum,
} from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';
import { IRadioGroup } from '../../../../../../shared/types/box-group-item.type';
import { FilterSearch } from '../../../../../../shared/types/crud-filters.types';

@UntilDestroy()
@Component({
  selector: 'app-voucher-create-form',
  templateUrl: './voucher-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoucherCreateFormComponent extends DynamicForm<VoucherCreateInput> {
  codeMaxLength: number = 18;

  defaultFormValue: Partial<any> = {
    isActive: true,
    freeShipping: {
      countryEligibility: VoucherCountryEligibilityEnum.ALL,
      countryIds: [],
      isMaxShippingRate: false,
    },
    discount: {
      productEligibility: VoucherProductEligibilityEnum.ALL,
      productIds: [],
      productTags: [],
      value: 0,
      isAppliedToDeliveryFee: false,
    },
    requirements: VoucherRequirementsEnum.NONE,
    voucherType: VoucherTypeEnum.FREE_SHIPPING,
    customerEligibility: VoucherCustomerEligibilityEnum.ALL,
    storeEligibility: VoucherStoreEligibilityEnum.ALL,
    isLimitUsageTotal: false,
    isLimitUsagePerCustomer: false,
    isForNewCustomerOnly: false,
  };

  form: UntypedFormGroup = this.fb.group({
    code: [null, [Validators.maxLength(this.codeMaxLength)]],
    isActive: [true, [Validators.required]],
    voucherType: [null, [Validators.required]],
    requirements: [null, [Validators.required]],
    minCostAmount: [null],
    minItemAmount: [null],
    isLimitUsageTotal: [null, [Validators.required]],
    limitUsageTotal: [null],
    isLimitUsagePerCustomer: [null, [Validators.required]],
    limitUsagePerCustomer: [null],
    customerEligibility: [null],
    customerTags: [null],
    customerIds: [null],
    storeEligibility: [null],
    storeCorporateCodes: [null],
    storeBrandCodes: [null],
    storeIds: [null],
    isForNewCustomerOnly: [null, [Validators.required]],
    excludeProductCategories: [null],
    dateStart: [null, [Validators.required]],
    dateEnd: [null, [Validators.required]],
    freeShipping: [null],
    discount: [null],
  });

  dateTimeFormat: string = DATE_TIME_FORMAT;
  defaultTime = new Date(0, 0, 0, 0, 0, 0);
  isLoading$: Observable<boolean> = this.appManagerVoucherService.isLoading$;

  // eslint-disable-next-line unicorn/consistent-function-scoping
  voucherTypes: IRadioGroup[] = Object.keys(VoucherTypeEnum).map((voucherType: string) => ({
    value: voucherType,
    label: voucherType[0] + voucherType.slice(1).toLowerCase().replace(/_/g, ' '),
  }));

  requirementsList: IRadioGroup[] = [
    { value: VoucherRequirementsEnum.NONE, label: 'None' },
    { value: VoucherRequirementsEnum.MIN_COST_AMOUNT, label: 'Min overall cost' },
    { value: VoucherRequirementsEnum.MIN_ITEMS_AMOUNT, label: 'Min items amount' },
  ];

  customerEligibilityTypes: IRadioGroup[] = [
    { value: VoucherCustomerEligibilityEnum.ALL, label: 'All' },
    { value: VoucherCustomerEligibilityEnum.TAGS, label: 'Specific tags of customers' },
    { value: VoucherCustomerEligibilityEnum.SELECTED, label: 'Specific customers' },
  ];

  storeEligibilityTypes: IRadioGroup[] = [
    { value: VoucherStoreEligibilityEnum.ALL, label: 'All' },
    { value: VoucherStoreEligibilityEnum.SELECTED, label: 'Specific stores' },
  ];

  onGenerateVoucherCode(): void {
    this.appManagerVoucherService.generateVoucherCode().subscribe(({ code }: VoucherCodeDto) => {
      this.form.patchValue({ code });
    });
  }

  storeCorporateList: SelectOptions<CorporateEntity> = {
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

  storeBrandList: SelectOptions<StoreBrandEntity> = {
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

  storesList: SelectOptions<StoreEntity> = {
    service: this.crudStoreService,
    fields: ['id', 'name_i18n'],
    valueKey: 'id',
    getLabel(item: StoreEntity): string {
      return `${item.name_i18n}`;
    },
    search(term: string): string[] {
      return [['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||')];
    },
  };

  customersList: SelectOptions<CustomerEntity> = {
    service: this.crudCustomerService,
    fields: ['id', 'email'],
    filterForS: [{ role: CustomerRoleEnum.CUSTOMER }],
    join: ['settings||firstName,lastName'],
    valueKey: 'id',
    getLabel(item: CustomerEntity): string {
      return `${item.settings?.firstName} ${item.settings?.lastName} (${item.email})`;
    },
    searchForS(term: string): FilterSearch<CustomerEntity>[] {
      const [firstName, lastName] = term.split(' ');

      return [
        {
          $or: [
            { email: { [CondOperator.CONTAINS_LOW]: firstName } },
            { 'settings.firstName': { [CondOperator.CONTAINS_LOW]: firstName } },
            { 'settings.lastName': { [CondOperator.CONTAINS_LOW]: firstName || lastName } },
          ],
        },
      ];
    },
  };

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly crudCustomerService: CrudCustomerService,
    private readonly crudStoreService: CrudStoreService,
    private readonly appManagerVoucherService: AppManagerVoucherService,
    private readonly crudCorporateService: CrudCorporateService,
    private readonly crudStoreBrandService: CrudStoreBrandService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.onValuesChangesSet();
  }

  beforeSubmit(value: VoucherCreateInput): any {
    if (value.voucherType === VoucherTypeEnum.FREE_SHIPPING) {
      delete value.discount;
    }

    if ([VoucherTypeEnum.DISCOUNT_FIXED, VoucherTypeEnum.DISCOUNT_PERCENTAGE].includes(value.voucherType)) {
      delete value.freeShipping;
    }

    return value;
  }

  disabledDate(difference: number): (current: Date) => boolean {
    return (current: Date): boolean => differenceInCalendarDays(current, new Date()) < difference;
  }

  onValuesChangesSet(): void {
    this.form
      .get('requirements')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe((value: VoucherRequirementsEnum) => {
        if (value !== VoucherRequirementsEnum.MIN_COST_AMOUNT) {
          this.form.patchValue({ minCostAmount: null });
        }

        if (value !== VoucherRequirementsEnum.MIN_ITEMS_AMOUNT) {
          this.form.patchValue({ minItemAmount: null });
        }
      });

    this.form
      .get('isLimitUsageTotal')
      ?.valueChanges.pipe(
        untilDestroyed(this),
        filter((isLimitUsageTotal: boolean) => !isLimitUsageTotal),
      )
      .subscribe(() => this.form.patchValue({ limitUsageTotal: null }));

    this.form
      .get('isLimitUsagePerCustomer')
      ?.valueChanges.pipe(
        untilDestroyed(this),
        filter((isLimitUsagePerCustomer: boolean) => !isLimitUsagePerCustomer),
      )
      .subscribe(() => this.form.patchValue({ limitUsagePerCustomer: null }));

    this.form
      .get('customerEligibility')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe((value: VoucherCustomerEligibilityEnum) => {
        if (value !== VoucherCustomerEligibilityEnum.SELECTED) {
          this.form.patchValue({ customerIds: null });
        }

        if (value !== VoucherCustomerEligibilityEnum.TAGS) {
          this.form.patchValue({ customerTags: null });
        }
      });

    this.form
      .get('storeEligibility')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe((value: VoucherStoreEligibilityEnum) => {
        if (value !== VoucherStoreEligibilityEnum.SELECTED) {
          this.form.patchValue({ storeCorporateCodes: null });
        }
      });

    this.form.controls.storeCorporateCodes.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((currentValue: string[]) => {
        this.form.patchValue({ storeBrandCodes: null });

        if (currentValue !== null && currentValue.length > 0) {
          this.storeBrandList = {
            ...this.storeBrandList,
            filter: [['corporateCode', CondOperator.IN, currentValue.join(',')].join('||')],
          };
        }
      });

    this.form.controls.storeBrandCodes.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((currentValue: string[]) => {
        this.form.patchValue({ storeIds: null });

        if (currentValue !== null && currentValue.length > 0) {
          this.storesList = {
            ...this.storesList,
            filter: [['storeBrandCode', CondOperator.IN, currentValue.join(',')].join('||')],
          };
        }
      });
  }
}
