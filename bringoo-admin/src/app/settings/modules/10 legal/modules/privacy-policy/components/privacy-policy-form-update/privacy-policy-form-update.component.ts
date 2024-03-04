import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { PrivacyPolicyUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-privacy-policy-form-create',
  templateUrl: './privacy-policy-form-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyFormUpdateComponent extends DynamicForm<PrivacyPolicyUpdateInput> {
  imageUrlPath: string = 'privacy-policy';

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      code: [null, [Validators.required]],
      isActive: [null, [Validators.required]],
      md_i18n: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
    });
  }
}
