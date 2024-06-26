import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { ReplaceTypeCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-replacement-option-create-form',
  templateUrl: './replacement-option-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplacementOptionCreateFormComponent extends DynamicForm<ReplaceTypeCreateInput> {
  defaultFormValue: Partial<ReplaceTypeCreateInput> = {
    isActive: true,
  };

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null],
      isActive: [null],
      code: [null, [Validators.required]],
    });
  }
}
