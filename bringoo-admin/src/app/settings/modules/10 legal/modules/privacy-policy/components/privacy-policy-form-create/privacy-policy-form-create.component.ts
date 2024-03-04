import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';

import { PrivacyPolicyCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-privacy-policy-form-create',
  templateUrl: './privacy-policy-form-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyFormCreateComponent extends DynamicForm<PrivacyPolicyCreateInput> {
  imageUrlPath: string = 'privacy-policy';
  defaultFormValue: Partial<PrivacyPolicyCreateInput> = {
    isActive: true,
    dateStart: format(new Date(), DATE_FORMAT),
    code: '',
    dateEnd: '',
  };

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
