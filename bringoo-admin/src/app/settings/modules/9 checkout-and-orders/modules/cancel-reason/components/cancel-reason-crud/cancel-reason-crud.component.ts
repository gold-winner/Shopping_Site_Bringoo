import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudOrderCancelReasonService } from '../../../../../../../../shared/api/auth/crud-order-cancel-reason.service';
import {
  OrderCancelReasonCreateInput,
  OrderCancelReasonEntity,
  OrderCancelReasonUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { CancelReasonCreateFormComponent } from '../cancel-reason-create-form/cancel-reason-create-form.component';
import { CancelReasonFilterFormComponent } from '../cancel-reason-filter-form/cancel-reason-filter-form.component';
import { CancelReasonUpdateFormComponent } from '../vendor-type-update-form/cancel-reason-update-form.component';

@Component({
  selector: 'app-cancel-reason-crud',
  templateUrl: './cancel-reason-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelReasonCrudComponent {
  createForm: Type<DynamicForm<OrderCancelReasonCreateInput>> = CancelReasonCreateFormComponent;
  updateForm: Type<DynamicForm<OrderCancelReasonUpdateInput>> = CancelReasonUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = CancelReasonFilterFormComponent;

  pageSizeOptions: number[] = [50, 100, 250, 500];

  fields: CrudFields<OrderCancelReasonEntity> = ['code', 'name_i18n', 'isActive', 'create_date', 'update_date'];
  config: CrudConfig = {
    title: 'Cancel reason',
    plural: 'Cancel reasons',
    single: 'Cancel reason',
  };

  columns: CrudColumn<OrderCancelReasonEntity>[] = [
    {
      label: 'Code',
      isSortable: true,
      sortBy: 'code',
      getField(item: OrderCancelReasonEntity): EntityValue {
        return item.code;
      },
      type: 'text',
    },
    {
      label: 'Name',
      isSortable: true,
      sortBy: 'name_i18n',
      getField(item: OrderCancelReasonEntity): EntityValue {
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
      getField(item: OrderCancelReasonEntity): EntityValue {
        return item.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
  ];

  constructor(public readonly service: CrudOrderCancelReasonService) {}
}
