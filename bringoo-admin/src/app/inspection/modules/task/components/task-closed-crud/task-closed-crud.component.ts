import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudManagerTaskService } from '../../../../../../shared/api/auth/crud-manager-task.service';
import { ManagerTaskEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { TaskClosedFilterFormComponent } from '../task-closed-filter-form/task-closed-filter-form.component';

@Component({
  selector: 'app-closed-task-crud',
  templateUrl: './task-closed-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskClosedCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = TaskClosedFilterFormComponent;

  fields: CrudFields<ManagerTaskEntity> = ['taskType', 'body_i18n', 'isDone', 'create_date', 'data'];

  join: string[] = ['manager', 'manager.settings||firstName,lastName'];

  config: CrudConfig = {
    title: 'Manager tasks',
    plural: 'Manager tasks',
    single: 'Manager task',
    formWidth: 600,
    formBundleWidth: 600,
    isDeleteButtonVisible: false,
    isDetailButtonVisible: false,
    isEditButtonVisible: false,
    isEditSubmitButtonVisible: false,
    isCreateButtonVisible: false,
    isActionColumnVisible: false,
    isShowDefaultActions: false,
  };

  columns: CrudColumn<ManagerTaskEntity>[] = [
    {
      label: 'Task Type',
      isSortable: true,
      sortBy: 'taskType',
      getField(item: ManagerTaskEntity): EntityValue {
        return item.taskType;
      },
      type: 'text',
    },
    {
      label: 'Message',
      isSortable: false,
      getField(item: ManagerTaskEntity): EntityValue {
        return item.body_i18n;
      },
      type: 'text',
    },
    {
      label: 'Manager',
      isSortable: true,
      sortBy: 'manager.settings.firstName,manager.settings.lastName',
      getField(item: ManagerTaskEntity): EntityValue {
        return `${item.manager?.settings?.firstName} ${item.manager?.settings?.lastName}`;
      },
      type: 'link',
      link(item: ManagerTaskEntity): any {
        return `../../users/managers/details/${item.manager?.id}`;
      },
    },
    {
      label: 'Link',
      isSortable: false,
      getField(item: ManagerTaskEntity): EntityValue {
        return ` ${item?.data?.orderNumber ? item?.data?.orderNumber : 'Order'}`;
      },
      type: 'link',
      link(item: ManagerTaskEntity): any {
        return `../../../orders/all/detail/${item?.data?.orderId}`;
      },
    },
    {
      label: 'Date',
      isSortable: true,
      sortBy: 'create_date',
      getField(item: ManagerTaskEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
  ];

  constructor(public readonly service: CrudManagerTaskService) {}
}
