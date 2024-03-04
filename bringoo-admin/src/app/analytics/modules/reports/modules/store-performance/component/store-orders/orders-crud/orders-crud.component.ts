import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudOrderService } from '../../../../../../../../../shared/api/auth/crud-order.service';
import { OrderEntity } from '../../../../../../../../../shared/api/auth/data-contracts';
import { ORDER_TABLE_FIELDS, ORDERS_TABLE_COLUMNS, ORDERS_TABLE_JOIN } from '../../../../../../../../../shared/config/orders-table.config';
import { DynamicFilterFormComponent } from '../../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn } from '../../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../../shared/modules/crud/types/crud-select.type';
import { FilterFormComponent } from '../filter-form/filter-form.component';

@Component({
  selector: 'app-orders-crud',
  templateUrl: './orders-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersCrudComponent {
  filterForm: Type<DynamicFilterFormComponent> = FilterFormComponent;

  fields: CrudFields<OrderEntity> = ORDER_TABLE_FIELDS;
  join: string[] = ORDERS_TABLE_JOIN;

  config: CrudConfig = {
    title: 'Orders',
    plural: 'Orders',
    single: 'Order',
    isEditButtonVisible: false,
    isActionColumnVisible: false,
    isShowDefaultActions: false,
    isCreateButtonVisible: false,
    nzScrollX: '1500px',
  };

  columns: CrudColumn<OrderEntity>[] = ORDERS_TABLE_COLUMNS;

  constructor(public readonly service: CrudOrderService) {}
}
