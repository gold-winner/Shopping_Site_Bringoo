import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';

import { ProductLegalUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-privacy-policy-form-update',
  templateUrl: './product-legal-form-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLegalFormUpdateComponent extends DynamicForm<ProductLegalUpdateInput> {
  dateFormat: string = DATE_TIME_FORMAT;
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

  beforePatch(value: ProductLegalUpdateInput): ProductLegalUpdateInput {
    value.startDateTime = format(new Date(value.startDateTime ?? ''), DATE_TIME_FORMAT);

    return value;
  }
}
