import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { CurrencyCodeEnum, CurrencyUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-currency-update-form',
  templateUrl: './update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFormComponent extends DynamicForm<CurrencyUpdateInput> {
  codeList = Object.keys(CurrencyCodeEnum);

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null, [Validators.required]],
      isActive: [null, []],
      code: [null, []],
      symbol: [null, [Validators.required]],
    });
  }

  beforeSubmit(value: CurrencyUpdateInput): CurrencyUpdateInput {
    const formValues: CurrencyUpdateInput = value;
    let ind: keyof typeof formValues;
    for (ind in formValues) {
      if (value[ind] === null || !value[ind] || !this.form.get(ind)?.dirty) delete formValues[ind];
    }
    return formValues;
  }
}
