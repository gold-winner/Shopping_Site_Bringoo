import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CrudVatService } from '../../../../../../../../../../shared/api/auth/crud-vat.service';
import { PriceTypeEnum, ProductPriceCreateInput, VatEntity } from '../../../../../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../../../../../shared/modules/crud/enums/cond-operator';

@Component({
  selector: 'app-product-pricing-create-form',
  templateUrl: './product-pricing-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPricingCreateFormComponent extends DynamicForm<ProductPriceCreateInput> {
  defaultFormValue: Partial<ProductPriceCreateInput> = {
    productLinkId: this.route.parent?.snapshot.params['id'],
  };

  constructor(private fb: UntypedFormBuilder, private readonly route: ActivatedRoute, private readonly vatService: CrudVatService) {
    super();
    this.buildForm();
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

  pricingTypeList: string[] = Object.keys(PriceTypeEnum);

  buildForm(): void {
    this.form = this.fb.group({
      productLinkId: [null, [Validators.required]],
      type: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      price: [null, [Validators.required]],
      vatCode: [null, [Validators.required]],
      note: [null],
    });
  }
}
