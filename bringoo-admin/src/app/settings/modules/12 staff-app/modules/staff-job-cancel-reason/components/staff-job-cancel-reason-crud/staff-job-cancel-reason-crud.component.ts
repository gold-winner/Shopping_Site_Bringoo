import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudJobCancelReasonService } from '../../../../../../../../shared/api/auth/crud-job-cancel-reason.service';
import {
  JobCancelReasonCreateInput,
  JobCancelReasonEntity,
  JobCancelReasonUpdateInput,
  LanguageEntity,
  OrderCancelReasonEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StaffJobCancelReasonCreateFormComponent } from '../staff-job-cancel-reason-create-form/staff-job-cancel-reason-create-form.component';
import { StaffJobCancelReasonFilterFormComponent } from '../staff-job-cancel-reason-filter-form/staff-job-cancel-reason-filter-form.component';
import { StaffJobCancelReasonUpdateFormComponent } from '../staff-job-cancel-reason-update-form/staff-job-cancel-reason-update-form.component';

@Component({
  selector: 'app-staff-job-cancel-reason-crud',
  templateUrl: './staff-job-cancel-reason-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffJobCancelReasonCrudComponent {
  createForm: Type<DynamicForm<JobCancelReasonCreateInput>> = StaffJobCancelReasonCreateFormComponent;
  updateForm: Type<DynamicForm<JobCancelReasonUpdateInput>> = StaffJobCancelReasonUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = StaffJobCancelReasonFilterFormComponent;

  fields: CrudFields<JobCancelReasonEntity> = ['code', 'name_i18n', 'isActive', 'create_date', 'update_date'];

  config: CrudConfig = {
    title: 'Job cancel reason',
    plural: 'Cancel reasons',
    single: 'Cancel reason',
  };

  columns: CrudColumn<JobCancelReasonEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: LanguageEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: LanguageEntity): EntityValue {
        return item.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Created',
      isSortable: true,
      sortBy: 'create_date',
      getField(item: OrderCancelReasonEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Updated',
      isSortable: true,
      sortBy: 'update_date',
      getField(item: OrderCancelReasonEntity): EntityValue {
        return item.update_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: LanguageEntity): EntityValue {
        return item.isActive;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudJobCancelReasonService) {}
}
