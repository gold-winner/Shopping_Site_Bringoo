import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { take } from 'rxjs/operators';

import { CrudFaqTopicService } from '../../../../../../../../shared/api/auth/crud-faq-topic.service';
import { FaqTopicCreateInput, FaqTopicEntity, FaqTopicUpdateInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { FaqTopicCreateFormComponent } from '../faq-topic-create-form/faq-topic-create-form.component';
import { FaqTopicFilterFormComponent } from '../faq-topic-filter-form/faq-topic-filter-form.component';
import { FaqTopicUpdateFormComponent } from '../faq-topic-update-form/faq-topic-update-form.component';

@Component({
  selector: 'app-faq-item-crud',
  templateUrl: './faq-topic-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqTopicCrudComponent {
  createForm: Type<DynamicForm<FaqTopicCreateInput>> = FaqTopicCreateFormComponent;
  updateForm: Type<DynamicForm<FaqTopicUpdateInput>> = FaqTopicUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = FaqTopicFilterFormComponent;

  pageSizeOptions: number[] = [10, 20, 30, 50];

  fields: CrudFields<FaqTopicEntity> = ['code', 'name_i18n', 'description_i18n', 'dateStart', 'dateEnd', 'isActive', 'order'];
  config: CrudConfig = {
    title: 'FAQ Topic',
    plural: 'FAQ Topics',
    single: 'FAQ Topic',
    isDragged: true,
  };

  reloadPage: symbol | undefined;

  columns: CrudColumn<FaqTopicEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: FaqTopicEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: FaqTopicEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Active from',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: FaqTopicEntity): EntityValue {
        return item.dateStart;
      },
      type: 'date',
      dateFormat: DATE_FORMAT,
    },
    {
      label: 'Active to',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: FaqTopicEntity): EntityValue {
        return item.dateEnd;
      },
      type: 'date',
      dateFormat: DATE_FORMAT,
    },
    {
      label: 'Order',
      isSortable: true,
      sortBy: 'order',
      getField(item: FaqTopicEntity): EntityValue {
        return item.order;
      },
      type: 'text',
    },
  ];

  draggedEnd([sourceId, targetId]: [string, string]): void {
    if (sourceId && targetId && sourceId !== targetId) {
      this.service
        .changeOrder({ sourceId, targetId })
        .pipe(take(1))
        .subscribe(() => (this.reloadPage = Symbol('reload')));
    }
  }

  constructor(public readonly service: CrudFaqTopicService) {}
}
