import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { CountryCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { ISO2_CODES } from '../../../../../../../../shared/config/iso2-codes.config';
import { ISO3_CODES } from '../../../../../../../../shared/config/iso3-codes.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-country-create-form',
  templateUrl: './country-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryCreateFormComponent extends DynamicForm<CountryCreateInput> {
  listIso2: string[] = ISO2_CODES;
  listIso3: string[] = ISO3_CODES;

  defaultFormValue: Partial<CountryCreateInput> = {
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
      iso2: [null, [Validators.required]],
      iso3: [null, [Validators.required]],
      code: [null, [Validators.required]],
    });
  }
}
