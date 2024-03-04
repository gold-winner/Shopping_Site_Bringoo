import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { take } from 'rxjs/operators';

import { CrudFaqItemService } from '../../../../../../../../shared/api/auth/crud-faq-item.service';
import {
  FaqItemCreateInput,
  FaqItemEntity,
  FaqItemUpdateInput,
  FaqTopicEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { FaqItemCreateFormComponent } from '../faq-item-create-form/faq-item-create-form.component';
import { FaqItemFilterFormComponent } from '../faq-item-filter-form/faq-item-filter-form.component';
import { FaqItemUpdateFormComponent } from '../faq-item-update-form/faq-item-update-form.component';

@Component({
  selector: 'app-faq-item-crud',
  templateUrl: './faq-item-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqItemCrudComponent {
  createForm: Type<DynamicForm<FaqItemCreateInput>> = FaqItemCreateFormComponent;
  updateForm: Type<DynamicForm<FaqItemUpdateInput>> = FaqItemUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = FaqItemFilterFormComponent;

  pageSizeOptions: number[] = [10, 20, 30, 50];

  fields: CrudFields<FaqItemEntity> = ['code', 'topicCode', 'name_i18n', 'description_i18n', 'dateStart', 'dateEnd', 'isActive', 'order'];
  config: CrudConfig = {
    title: 'FAQ Item',
    plural: 'FAQ Items',
    single: 'FAQ Item',
    isDragged: true,
  };

  reloadPage: symbol | undefined;

  columns: CrudColumn<FaqItemEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: FaqItemEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Topic Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: FaqItemEntity): EntityValue {
        return item.topicCode;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: FaqItemEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Active from',
      isSortable: true,
      sortBy: 'dateStart',
      getField(item: FaqItemEntity): EntityValue {
        return item.dateStart;
      },
      type: 'date',
      dateFormat: DATE_FORMAT,
    },
    {
      label: 'Active to',
      isSortable: true,
      sortBy: 'dateEnd',
      getField(item: FaqItemEntity): EntityValue {
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

  constructor(public readonly service: CrudFaqItemService) {}
}
