import { ChangeDetectionStrategy, Component, EventEmitter, Output, Type } from '@angular/core';

import { CrudOrderService } from '../../../../../../../shared/api/auth/crud-order.service';
import { OrderEntity } from '../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../shared/modules/crud/types/crud-select.type';
import { StaffOrderHistoryFilterComponent } from './staff-order-history-filter/staff-order-history-filter.component';

@Component({
  selector: 'app-staff-order-history',
  templateUrl: './staff-order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffOrderHistoryComponent {
  @Output() totalCount: EventEmitter<number> = new EventEmitter<number>();
  filterForm: Type<DynamicFilterFormComponent> = StaffOrderHistoryFilterComponent;

  fields: CrudFields<OrderEntity> = [
    'orderNumber',
    'deliveryDate',
    'deliveryDateTimeFrom',
    'orderStatus',
    'orderQuantityFound',
    'grandTotal',
    'takenBy',
  ];

  join: string[] = ['currency', 'jobs'];

  config: CrudConfig = {
    title: 'Orders history',
    plural: 'Orders histories',
    single: 'Order history',
    isDeleteButtonVisible: false,
    isEditButtonVisible: false,
    isCreateButtonVisible: false,
    isActionColumnVisible: false,
    isShowDefaultActions: false,
    useTableHeightCalculation: false,
  };

  columns: CrudColumn<OrderEntity>[] = [
    {
      label: 'Order ID',
      isSortable: true,
      sortBy: 'orderNumber',
      getField(item: OrderEntity): EntityValue {
        return item.orderNumber;
      },
      type: 'link',
      link(item: OrderEntity): string {
        return `/orders/all/detail/${item.id}`;
      },
    },
    {
      label: 'Expected Delivery',
      isSortable: true,
      sortBy: 'deliveryDateTimeFrom',
      getField(item: OrderEntity): EntityValue {
        return item?.deliveryDateTimeFrom ? new Date(item.deliveryDateTimeFrom).valueOf() : null;
      },
      type: 'date',
      dateFormat: 'short',
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'orderNumber',
      getField(item: OrderEntity): EntityValue {
        return item.orderStatus;
      },
      type: 'text',
    },
    {
      label: 'Items',
      isSortable: true,
      sortBy: 'orderQuantityFound',
      align: 'right',
      getField(item: OrderEntity): EntityValue {
        return item.orderQuantityFound;
      },
      type: 'text',
    },
    {
      label: 'Payment',
      isSortable: true,
      sortBy: 'totalAmount',
      align: 'right',
      getField(item: OrderEntity): EntityValue {
        return `${item?.grandTotal?.toFixed(2)}`;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudOrderService) {}
}
