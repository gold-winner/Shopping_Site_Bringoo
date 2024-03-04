import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';

import { ProductLegalCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-privacy-policy-form-create',
  templateUrl: './product-legal-form-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLegalFormCreateComponent extends DynamicForm<ProductLegalCreateInput> {
  dateFormat: string = DATE_TIME_FORMAT;

  defaultFormValue: Partial<ProductLegalCreateInput> = {
    startDateTime: format(new Date(), DATE_TIME_FORMAT),
    isActive: true,
  };

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null, [Validators.required]],
      code: [null, [Validators.required]],
      isActive: [null, [Validators.required]],
      startDateTime: [null, [Validators.required]],
    });
  }
}
