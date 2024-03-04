import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { SettingsCountryAllowedCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-country-allowed-create-form',
  templateUrl: './country-allowed-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryAllowedCreateFormComponent extends DynamicForm<SettingsCountryAllowedCreateInput> {
  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      phoneCountryCode: [null, [Validators.required]],
    });
  }
}
