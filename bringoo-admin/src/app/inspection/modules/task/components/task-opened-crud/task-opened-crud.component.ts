import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Type } from '@angular/core';

import { AppManagerTaskService } from '../../../../../../shared/api/auth/app-manager-task.service';
import { CrudManagerTaskService } from '../../../../../../shared/api/auth/crud-manager-task.service';
import { ManagerTaskEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { TaskOpenedFilterFormComponent } from '../task-opened-filter-form/task-opened-filter-form.component';

@Component({
  selector: 'app-opened-task-crud',
  templateUrl: './task-opened-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskOpenedCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = TaskOpenedFilterFormComponent;
  reloadPage: symbol | undefined;

  fields: CrudFields<ManagerTaskEntity> = ['taskType', 'body_i18n', 'isDone', 'create_date', 'data'];

  config: CrudConfig = {
    title: 'Opened manager tasks',
    plural: 'Opened manager tasks',
    single: 'Opened manager task',
    formWidth: 600,
    formBundleWidth: 600,
    isDeleteButtonVisible: false,
    isDetailButtonVisible: false,
    isEditButtonVisible: false,
    isEditSubmitButtonVisible: false,
    isCreateButtonVisible: false,
    isActionColumnVisible: false,
    isShowDefaultActions: false,
    actionsList: [
      {
        label: 'Mark as done',
        action: (setOfChecked: Set<string>): void => {
          this.appManagerTaskService.markTasksAsDone({ ids: [...setOfChecked] }).subscribe(() => {
            this.reloadPage = Symbol('reload');
            this.changeDetection.detectChanges();
          });
        },
      },
    ],
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

  constructor(
    public readonly service: CrudManagerTaskService,
    private readonly appManagerTaskService: AppManagerTaskService,
    private changeDetection: ChangeDetectorRef,
  ) {}
}
