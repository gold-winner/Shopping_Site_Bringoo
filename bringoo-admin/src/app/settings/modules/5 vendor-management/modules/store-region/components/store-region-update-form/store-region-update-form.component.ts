import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { CurrencyCodeEnum, StoreRegionUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-customer-create-form',
  templateUrl: './store-region-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreRegionUpdateFormComponent extends DynamicForm<StoreRegionUpdateInput> {
  codeList = Object.keys(CurrencyCodeEnum);

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      code: [null, [Validators.required]],
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      isActive: [null],
      countryCode: [null, [Validators.required]],
    });
  }
}
