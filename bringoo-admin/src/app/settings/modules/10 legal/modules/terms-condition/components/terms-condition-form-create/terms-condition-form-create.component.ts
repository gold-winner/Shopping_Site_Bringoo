import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';

import { TermsConditionCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-terms-condition-form-create',
  templateUrl: './terms-condition-form-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsConditionFormCreateComponent extends DynamicForm<TermsConditionCreateInput> {
  defaultFormValue: Partial<TermsConditionCreateInput> = {
    isActive: true,
    dateStart: format(new Date(), DATE_FORMAT),
  };

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [undefined, []],
      isActive: [null, [Validators.required]],
      code: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      children: this.fb.array([]),
    });
  }

  get children(): UntypedFormArray {
    return this.form.get('children') as UntypedFormArray;
  }
}
