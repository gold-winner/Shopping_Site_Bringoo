import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudOrderService } from '../../../../../../shared/api/auth/crud-order.service';
import { OrderEntity } from '../../../../../../shared/api/auth/data-contracts';
import { OrdersFilterFormComponent } from '../../../../../../shared/components/orders-filter-form/orders-filter-form.component';
import { ORDER_TABLE_FIELDS, ORDERS_TABLE_COLUMNS, ORDERS_TABLE_JOIN } from '../../../../../../shared/config/orders-table.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';

@Component({
  selector: 'app-orders-crud',
  templateUrl: './orders-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = OrdersFilterFormComponent;

  fields: CrudFields<OrderEntity> = ORDER_TABLE_FIELDS;
  join: string[] = ORDERS_TABLE_JOIN;

  config: CrudConfig = {
    title: 'Orders',
    plural: 'Orders',
    single: 'Order',
    isCreateButtonVisible: false,
    isActionColumnVisible: false,
    nzScrollX: '2000px',
  };

  columns: CrudColumn<OrderEntity>[] = [...ORDERS_TABLE_COLUMNS];

  constructor(public readonly service: CrudOrderService) {}
}
