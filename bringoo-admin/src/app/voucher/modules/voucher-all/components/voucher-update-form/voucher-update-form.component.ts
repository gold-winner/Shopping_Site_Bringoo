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
  VoucherCreateInput,
  VoucherCustomerEligibilityEnum,
  VoucherRequirementsEnum,
  VoucherStoreEligibilityEnum,
  VoucherTypeEnum,
  VoucherUpdateInput,
} from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';
import { IRadioGroup } from '../../../../../../shared/types/box-group-item.type';

@UntilDestroy()
@Component({
  selector: 'app-voucher-update-form',
  templateUrl: './voucher-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoucherUpdateFormComponent extends DynamicForm<VoucherUpdateInput> {
  form: UntypedFormGroup = this.fb.group({
    code: [null],
    isActive: [true, [Validators.required]],
    voucherType: [null, [Validators.required]],
    requirements: [null, [Validators.required]],
    minCostAmount: [null],
    minItemAmount: [null],
    isLimitUsageTotal: [null, [Validators.required]],
    limitUsageTotal: [null],
    isLimitUsagePerCustomer: [null, [Validators.required]],
    limitUsagePerCustomer: [null],
    isForNewCustomerOnly: [null, [Validators.required]],
    customerEligibility: [null],
    customerTags: [null],
    customerIds: [null],
    storeEligibility: [null],
    storeCorporateCodes: [null],
    storeBrandCodes: [null],
    storeIds: [null],
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

  customerEligibilityTypes: IRadioGroup[] = [
    { value: VoucherCustomerEligibilityEnum.ALL, label: 'All' },
    { value: VoucherCustomerEligibilityEnum.TAGS, label: 'Specific tags of customers' },
    { value: VoucherCustomerEligibilityEnum.SELECTED, label: 'Specific customers' },
  ];

  storeEligibilityTypes: IRadioGroup[] = [
    { value: VoucherStoreEligibilityEnum.ALL, label: 'All' },
    { value: VoucherStoreEligibilityEnum.SELECTED, label: 'Specific stores' },
  ];

  requirementsList: IRadioGroup[] = [
    { value: VoucherRequirementsEnum.NONE, label: 'None' },
    { value: VoucherRequirementsEnum.MIN_COST_AMOUNT, label: 'Min overall cost' },
    { value: VoucherRequirementsEnum.MIN_ITEMS_AMOUNT, label: 'Min items amount' },
  ];

  customersList: SelectOptions<CustomerEntity> = {
    service: this.crudCustomerService,
    fields: ['id'],
    filter: [['role', CondOperator.EQUALS, CustomerRoleEnum.CUSTOMER].join('||')],
    join: ['settings||firstName,lastName'],
    valueKey: 'id',
    getLabel(item: CustomerEntity): string {
      return `${item.settings?.firstName} ${item.settings?.lastName}`;
    },
    search(term: string): string[] {
      return [
        ['settings.firstName', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['settings.lastName', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

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
          this.form.patchValue({ storeIds: null });
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
