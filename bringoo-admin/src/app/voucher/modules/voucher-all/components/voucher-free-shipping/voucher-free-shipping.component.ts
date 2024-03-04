import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CrudCountryService } from '../../../../../../shared/api/auth/crud-country.service';
import { CountryEntity, VoucherCountryEligibilityEnum } from '../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';
import { IRadioGroup } from '../../../../../../shared/types/box-group-item.type';

@UntilDestroy()
@Component({
  selector: 'app-voucher-free-shipping',
  templateUrl: './voucher-free-shipping.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VoucherFreeShippingComponent),
      multi: true,
    },
  ],
})
export class VoucherFreeShippingComponent implements ControlValueAccessor {
  form: UntypedFormGroup = this.fb.group({
    countryEligibility: [VoucherCountryEligibilityEnum.ALL, [Validators.required]],
    countryIds: [null],
    isMaxShippingRate: [null, [Validators.required]],
    maxShippingRate: [null],
  });

  countriesList: SelectOptions<CountryEntity> = {
    service: this.crudCountryService,
    fields: ['name_i18n', 'code', 'id'],
    valueKey: 'id',
    getLabel(item: CountryEntity): string {
      return `${item.name_i18n}`;
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  countryEligibilityList: IRadioGroup[] = [
    { value: VoucherCountryEligibilityEnum.ALL, label: 'All countries' },
    { value: VoucherCountryEligibilityEnum.SELECTED, label: 'Specific countries' },
  ];

  constructor(private readonly fb: UntypedFormBuilder, private readonly crudCountryService: CrudCountryService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange(_: any): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTouched(): void {}

  writeValue(val: any): void {
    if (val) {
      this.form.patchValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((value: any) => {
      this.onTouched();
      this.onChange(value);
    });

    this.form
      .get('countryEligibility')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe((value: VoucherCountryEligibilityEnum) => {
        if (value !== VoucherCountryEligibilityEnum.SELECTED) {
          this.form.patchValue({ countryIds: null });
        }
      });
  }
}
