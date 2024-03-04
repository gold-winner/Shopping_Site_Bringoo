import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { CurrencyCodeEnum, StoreRegionCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-store-region-create-form',
  templateUrl: './store-region-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreRegionCreateFormComponent extends DynamicForm<StoreRegionCreateInput> {
  codeList = Object.keys(CurrencyCodeEnum);
  defaultFormValue: Partial<StoreRegionCreateInput> = {
    isActive: true,
  };

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      code: [null, [Validators.required]],
      name_i18n: [null, [Validators.required]],
      description_i18n: [undefined],
      isActive: [null],
      countryCode: [null, [Validators.required]],
    });
  }
}
