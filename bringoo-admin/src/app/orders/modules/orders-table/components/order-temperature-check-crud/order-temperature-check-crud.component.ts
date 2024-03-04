import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';

import { CrudOrderTemperatureCheckService } from '../../../../../../shared/api/auth/crud-order-temperature-check.service';
import { OrderTemperatureCheckCreateInput, OrderTemperatureCheckEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { OrderTemperatureCheckCreateFormComponent } from '../order-temperature-check-create/order-temperature-check-create-form.component';
import { OrderTemperatureCheckFilterFormComponent } from '../order-temperature-check-filter-form/order-temperature-check-filter-form.component';

@Component({
  selector: 'app-order-temperature-check-crud',
  templateUrl: './order-temperature-check-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTemperatureCheckCrudComponent {
  @Input() userType: 'customer' | 'staff' | undefined;

  createForm: Type<DynamicForm<OrderTemperatureCheckCreateInput>> = OrderTemperatureCheckCreateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = OrderTemperatureCheckFilterFormComponent;

  fields: CrudFields<OrderTemperatureCheckEntity> = ['create_date', 'comment', 'staffId', 'managerId', 'temperature', 'imageUrl'];

  join: string[] = ['manager||email', 'manager.settings||firstName,lastName', 'staff||email', 'staff.settings||firstName,lastName'];

  config: CrudConfig = {
    title: 'Order Temperature Check',
    plural: 'Order Temperature Checks',
    single: 'Order Temperature Check',
    isEditButtonVisible: false,
    isActionColumnVisible: false,
    useTableHeightCalculation: false,
  };

  columns: CrudColumn<OrderTemperatureCheckEntity>[] = [
    {
      label: 'Temperature',
      isSortable: false,
      getField(item: OrderTemperatureCheckEntity): EntityValue {
        return item.temperature;
      },
      type: 'text',
    },
    {
      label: 'Image',
      isSortable: false,
      getField(item: OrderTemperatureCheckEntity): EntityValue {
        return item.imageUrl;
      },
      type: 'image',
      fixedLeft: true,
    },
    {
      label: 'Create Date',
      isSortable: false,
      sortBy: 'create_date',
      getField(item: OrderTemperatureCheckEntity): EntityValue {
        return item.create_date;
      },
      type: 'date',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Manager',
      isSortable: false,
      getField(item: OrderTemperatureCheckEntity): EntityValue {
        return item.manager?.settings?.firstName ? `${item.manager?.settings?.firstName} ${item.manager?.settings?.lastName}` : '';
      },
      type: 'text',
    },
    {
      label: 'Staff',
      isSortable: false,
      getField(item: OrderTemperatureCheckEntity): EntityValue {
        return item.staff?.settings?.firstName ? `${item.staff?.settings?.firstName} ${item.staff?.settings?.lastName}` : '';
      },
      type: 'text',
    },
    {
      label: 'Comment',
      isSortable: false,
      getField(item: OrderTemperatureCheckEntity): EntityValue {
        return item.comment;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudOrderTemperatureCheckService) {}
}
