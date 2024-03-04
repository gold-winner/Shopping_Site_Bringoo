import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';

import { CrudProductService } from '../../../../../../shared/api/auth/crud-product.service';
import { ProductEntity } from '../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../shared/interfaces/select-options';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';
import { IRadioGroup } from '../../../../../../shared/types/box-group-item.type';
import { VoucherSettingsComponent } from '../../helpers/voucher-settings-component';

@Component({
  selector: 'app-voucher-buy-get',
  templateUrl: './voucher-buy-get.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VoucherBuyGetComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => VoucherBuyGetComponent),
      multi: true,
    },
  ],
})
export class VoucherBuyGetComponent extends VoucherSettingsComponent {
  productList: SelectOptions<ProductEntity> = {
    service: this.crudProductService,
    fields: ['code', 'name_i18n'],
    valueKey: 'code',
    getLabel(item: ProductEntity): string {
      return `${item.name_i18n}`;
    },
    search(term: string): string[] {
      return [['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||')];
    },
  };

  maximumCountInOrderControl: UntypedFormControl = new UntypedFormControl(true);

  constructor(private readonly fb: UntypedFormBuilder, private readonly crudProductService: CrudProductService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.disableMaximumDiscountNumber();
  }

  minimumType: IRadioGroup[] = [
    { value: true, label: 'Minimum quantity of items ' },
    { value: false, label: 'Minimum purchase amount ' },
  ];

  buildForm(): void {
    this.form = this.fb.group({
      isQuantity: [this.minimumType[0].value],

      buyQuantity: [null, [Validators.required]],
      buyItemsForm: [null, [Validators.required]],
      buyProductCodes: [null, [Validators.required]],

      getQuality: [null, [Validators.required]],
      getItemsForm: [null, [Validators.required]],
      getProductCodes: [null, [Validators.required]],

      isPercentage: [false, [Validators.required]],
      value: [null, [Validators.required]],
      maxInOrder: [null, [Validators.required]],
    });
  }

  disableMaximumDiscountNumber(): void {
    this.maximumCountInOrderControl.valueChanges
      .pipe(
        untilDestroyed(this),
        filter((isEnabled: boolean) => !isEnabled),
      )
      .subscribe(() => this.form.patchValue({ maxInOrder: null }));
  }
}
