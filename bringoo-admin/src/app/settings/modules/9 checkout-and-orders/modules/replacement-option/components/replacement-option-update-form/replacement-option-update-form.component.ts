import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { ReplaceTypeUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-replacement-option-update-form',
  templateUrl: './replacement-option-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplacementOptionUpdateFormComponent extends DynamicForm<ReplaceTypeUpdateInput> {
  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      code: [null, [Validators.required]],
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      isActive: [null, [Validators.required]],
    });
  }
}
