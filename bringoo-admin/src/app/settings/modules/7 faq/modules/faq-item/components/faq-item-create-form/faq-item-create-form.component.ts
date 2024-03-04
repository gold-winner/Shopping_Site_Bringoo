import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { CrudFaqTopicService } from '../../../../../../../../shared/api/auth/crud-faq-topic.service';
import { FaqItemCreateInput, FaqTopicEntity, UserGroupEnum } from '../../../../../../../../shared/api/auth/data-contracts';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';

@Component({
  selector: 'app-faq-item-create-form',
  templateUrl: './faq-item-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqItemCreateFormComponent extends DynamicForm<FaqItemCreateInput> {
  defaultFormValue: Partial<FaqItemCreateInput> = {
    isActive: true,
  };

  userGroups: string[] = Object.values(UserGroupEnum);

  topicCode: SelectOptions<FaqTopicEntity> = {
    service: this.crudFaqTopicService,
    fields: ['name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: FaqTopicEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private fb: UntypedFormBuilder, private readonly crudFaqTopicService: CrudFaqTopicService) {
    super();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name_i18n: [null, [Validators.required]],
      description_i18n: [null, [Validators.required]],
      code: [null, [Validators.required]],
      topicCode: [null, [Validators.required]],
      userGroup: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      isActive: [null, [Validators.required]],
    });
  }
}
