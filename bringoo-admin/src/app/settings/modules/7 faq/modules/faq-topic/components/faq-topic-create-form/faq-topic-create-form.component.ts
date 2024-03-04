import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { FaqTopicCreateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-faq-item-create-form',
  templateUrl: './faq-topic-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqTopicCreateFormComponent extends DynamicForm<FaqTopicCreateInput> {
  defaultFormValue: Partial<FaqTopicCreateInput> = {
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
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      isActive: [null],
    });
  }
}
