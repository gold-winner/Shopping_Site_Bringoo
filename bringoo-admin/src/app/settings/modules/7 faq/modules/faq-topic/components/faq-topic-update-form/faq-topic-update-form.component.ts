import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { FaqTopicUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';

@Component({
  selector: 'app-faq-item-update-form',
  templateUrl: './faq-topic-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqTopicUpdateFormComponent extends DynamicForm<FaqTopicUpdateInput> {
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
      isActive: [null, [Validators.required]],
    });
  }
}
