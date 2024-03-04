import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { CorporateCreateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-store-corporates-create-form',
  templateUrl: './store-corporates-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCorporatesCreateFormComponent extends DynamicForm<CorporateCreateInput> {
  defaultFormValue: Partial<CorporateCreateInput> = {
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
      description_i18n: [null, []],
      isActive: [null, []],
    });
  }
}
