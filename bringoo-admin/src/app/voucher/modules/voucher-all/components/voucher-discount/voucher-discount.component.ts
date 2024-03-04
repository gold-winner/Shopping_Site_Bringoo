import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CrudProductService } from '../../../../../../shared/api/auth/crud-product.service';
import { ProductEntity, VoucherProductEligibilityEnum, VoucherTypeEnum } from '../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';
import { IRadioGroup } from '../../../../../../shared/types/box-group-item.type';

@UntilDestroy()
@Component({
  selector: 'app-voucher-discount',
  templateUrl: './voucher-discount.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VoucherDiscountComponent),
      multi: true,
    },
  ],
})
export class VoucherDiscountComponent implements ControlValueAccessor {
  form: UntypedFormGroup = this.fb.group({
    value: [null, [Validators.required]],
    productEligibility: [null, [Validators.required]],
    productIds: [null],
    productTags: [null],
    isAppliedToDeliveryFee: [null, [Validators.required]],
  });

  @Input() voucherType!: VoucherTypeEnum;

  productList: SelectOptions<ProductEntity> = {
    service: this.crudProductService,
    fields: ['name_i18n'],
    valueKey: 'id',
    getLabel(item: ProductEntity): string {
      return `${item.name_i18n}`;
    },
    search(term: string): string[] {
      return [['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||')];
    },
  };

  productEligibilityList: IRadioGroup[] = [
    { value: VoucherProductEligibilityEnum.ALL, label: 'All products' },
    { value: VoucherProductEligibilityEnum.TAGS, label: 'Products tags' },
    { value: VoucherProductEligibilityEnum.SELECTED, label: 'Specific products' },
  ];

  constructor(readonly fb: UntypedFormBuilder, private readonly crudProductService: CrudProductService) {}

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
      .get('productEligibility')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe((value: VoucherProductEligibilityEnum) => {
        if (value !== VoucherProductEligibilityEnum.SELECTED) {
          this.form.patchValue({ productIds: null });
        }

        if (value !== VoucherProductEligibilityEnum.TAGS) {
          this.form.patchValue({ productTags: null });
        }
      });
  }
}
