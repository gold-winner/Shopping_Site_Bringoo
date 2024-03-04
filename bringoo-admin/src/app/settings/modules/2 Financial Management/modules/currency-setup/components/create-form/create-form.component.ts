import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { CurrencyCodeEnum, CurrencyCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-currency-create-form',
  templateUrl: './create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent extends DynamicForm<CurrencyCreateInput> {
  codeList = Object.keys(CurrencyCodeEnum);
  defaultFormValue: Partial<CurrencyCreateInput> = {
    code: CurrencyCodeEnum.USD,
    isActive: true,
  };

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null, []],
      isActive: [null, []],
      code: [null, []],
      symbol: [null, [Validators.required]],
    });
  }

  beforeSubmit(value: CurrencyCreateInput): CurrencyCreateInput {
    const formValues: CurrencyCreateInput = value;
    let ind: keyof typeof formValues;
    for (ind in formValues) {
      if (value[ind] === null || !value[ind]) delete formValues[ind];
    }
    return formValues;
  }
}
