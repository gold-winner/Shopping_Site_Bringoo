import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { SettingsCountryAllowedUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-country-allowed-update-form',
  templateUrl: './country-allowed-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryAllowedUpdateFormComponent extends DynamicForm<SettingsCountryAllowedUpdateInput> {
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
