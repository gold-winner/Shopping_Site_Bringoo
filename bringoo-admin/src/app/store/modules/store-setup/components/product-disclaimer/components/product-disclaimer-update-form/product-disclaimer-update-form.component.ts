import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import {
  I18NInput,
  ProductDisclaimerDeliveryEnum,
  ProductDisclaimerEntity,
  ProductDisclaimerSellerEnum,
  ProductDisclaimerUpdateInput,
  ProductEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { ToFormGroupType } from '../../../../../../../../shared/types/to-form-group.type';

type FormType = ToFormGroupType<ProductDisclaimerUpdateInput>;

@UntilDestroy()
@Component({
  selector: 'app-product-disclaimer-update-form',
  templateUrl: './product-disclaimer-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDisclaimerUpdateFormComponent extends DynamicForm<ProductDisclaimerUpdateInput> {
  productLinkIds: string[] = [];
  productIds: string[] = [];
  sellers: string[] = Object.values(ProductDisclaimerSellerEnum);
  delivers: string[] = Object.values(ProductDisclaimerDeliveryEnum);
  product!: ProductEntity;
  productName: FormControl<I18NInput | null> = new FormControl<I18NInput | null>(null);

  form: FormGroup<FormType> = new FormGroup<FormType>({
    code: new FormControl(null),
    name_i18n: new FormControl(null),
    description_i18n: new FormControl(null),
    dateStart: new FormControl(null),
    isActive: new FormControl(null),
    storeId: new FormControl(null),

    seller: new FormControl(null),
    delivery: new FormControl(null),
  });

  beforePatch(value: ProductDisclaimerUpdateInput & ProductDisclaimerEntity): ProductDisclaimerUpdateInput {
    if (value.product) {
      this.product = value.product;
      this.productName.patchValue((value?.product?.name_i18n as unknown) as I18NInput);
      this.productName.disable();
    }
    return value;
  }
}
