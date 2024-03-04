import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { SettingsEmailBlockedUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@UntilDestroy()
@Component({
  selector: 'app-email-blocked-update-form',
  templateUrl: './email-blocked-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailBlockedUpdateFormComponent extends DynamicForm<SettingsEmailBlockedUpdateInput> {
  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      emailDomain: [null, [Validators.required]],
    });
  }
}
