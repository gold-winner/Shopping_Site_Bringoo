import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CrudProductLinkService } from '../../../../../../../../shared/api/auth/crud-product-link.service';
import {
  ProductDisclaimerCreateInput,
  ProductDisclaimerDeliveryEnum,
  ProductDisclaimerSellerEnum,
  ProductLinkEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { validateForm } from '../../../../../../../../shared/helpers/validate-form';
import { Pageable } from '../../../../../../../../shared/interfaces/pageable';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { ToFormGroupType } from '../../../../../../../../shared/types/to-form-group.type';

type FormType = ToFormGroupType<ProductDisclaimerCreateInput>;

@UntilDestroy()
@Component({
  selector: 'app-product-disclaimer-create-form',
  templateUrl: './product-disclaimer-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDisclaimerCreateFormComponent extends DynamicForm<ProductDisclaimerCreateInput> {
  productLinkIds: string[] = [];
  sellers: string[] = Object.values(ProductDisclaimerSellerEnum);
  delivers: string[] = Object.values(ProductDisclaimerDeliveryEnum);

  form: FormGroup<FormType> = new FormGroup<FormType>({
    code: new FormControl(null),
    productIds: new FormControl([], [Validators.minLength(1)]),
    name_i18n: new FormControl(null),
    description_i18n: new FormControl(null),
    dateStart: new FormControl(null),
    isActive: new FormControl(null),
    storeId: new FormControl(null),

    seller: new FormControl(null),
    delivery: new FormControl(null),
  });

  defaultFormValue: Partial<ProductDisclaimerCreateInput> = {
    storeId: this.route?.parent?.parent?.snapshot.params['id'],
    isActive: true,
    productIds: [],
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly crudProductLinkService: CrudProductLinkService,
  ) {
    super();
  }

  onSelectProductLInks(ids: string[]): void {
    this.productLinkIds = ids;
  }

  onSubmit(): void {
    if (this.productLinkIds.length === 0) {
      validateForm(this.form);
    }

    this.crudProductLinkService
      .find({
        s: JSON.stringify({ id: { $in: this.productLinkIds } }),
        fields: 'productId',
      })
      .subscribe(({ items }: Pageable & { items?: ProductLinkEntity[] }) => {
        if (items) {
          this.form.patchValue({ productIds: items.map(({ productId }: ProductLinkEntity) => productId ?? '') });
          validateForm(this.form);

          if (this.form.valid) {
            this.formSubmit.emit(this.beforeSubmit(this.form.value as ProductDisclaimerCreateInput));
          }
        }
      });
  }
}
