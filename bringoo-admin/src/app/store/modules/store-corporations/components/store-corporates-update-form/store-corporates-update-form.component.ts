import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { CorporateUpdateInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-store-corporates-update-form',
  templateUrl: './store-corporates-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCorporatesUpdateFormComponent extends DynamicForm<CorporateUpdateInput> {
  defaultFormValue: Partial<CorporateUpdateInput> = {};

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
