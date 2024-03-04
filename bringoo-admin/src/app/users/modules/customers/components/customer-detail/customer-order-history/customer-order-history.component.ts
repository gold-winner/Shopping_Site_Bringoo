import { ChangeDetectionStrategy, Component, EventEmitter, Output, Type } from '@angular/core';
import { format } from 'date-fns';

import { CrudOrderService } from '../../../../../../../shared/api/auth/crud-order.service';
import { OrderEntity } from '../../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../shared/modules/crud/types/crud-select.type';
import { CustomerOrderHistoryFilterComponent } from './customer-order-history-filter/customer-order-history-filter.component';

@Component({
  selector: 'app-customer-order-history',
  templateUrl: './customer-order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOrderHistoryComponent {
  filterForm: Type<DynamicFilterFormComponent> = CustomerOrderHistoryFilterComponent;
  @Output() totalCount: EventEmitter<number> = new EventEmitter<number>();

  fields: CrudFields<OrderEntity> = [
    'orderNumber',
    'orderQuantityRequested',
    'orderQuantityFound',
    'deliveryDate',
    'deliveryDateTimeFrom',
    'orderStatus',
    'grandTotal',
    'deliveryDateTimeTo',
  ];

  join: string[] = ['currency', 'store', 'store.region'];

  config: CrudConfig = {
    title: 'Orders history',
    plural: 'Order histories',
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
      fixedLeft: true,
    },
    {
      label: 'Order date',
      isSortable: true,
      sortBy: 'deliveryDateTimeFrom',
      getField(item: OrderEntity): EntityValue {
        return item?.deliveryDateTimeTo ? format(new Date(item.deliveryDateTimeTo), DATE_TIME_FORMAT) : null;
      },
      type: 'text',
      dateFormat: DATE_TIME_FORMAT,
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'orderStatus',
      getField(item: OrderEntity): EntityValue {
        return item.orderStatus;
      },
      type: 'text',
    },
    {
      label: 'Store Name',
      isSortable: false,
      getField(item: OrderEntity): EntityValue {
        return item.store?.name_i18n;
      },
      type: 'text',
      fixedLeft: true,
    },
    {
      label: 'Store Region',
      isSortable: false,
      getField(item: OrderEntity): EntityValue {
        return item.store?.region?.name_i18n;
      },
      type: 'text',
    },
    {
      label: 'Items Refund',
      isSortable: false,
      getField(item: OrderEntity): EntityValue {
        return `${(item.orderQuantityRequested ?? 0) - (item.orderQuantityFound ?? 0)}`;
      },
      type: 'text',
      align: 'right',
    },
    {
      label: 'Items ordered',
      isSortable: true,
      sortBy: 'orderQuantityFound',
      getField(item: OrderEntity): EntityValue {
        return item.orderQuantityRequested;
      },
      type: 'text',
      align: 'right',
    },
    {
      label: 'Total Amount',
      isSortable: true,
      sortBy: 'grandTotal',
      getField(item: OrderEntity): EntityValue {
        return `${item?.grandTotal?.toFixed(2)}`;
      },
      type: 'text',
      align: 'right',
    },
  ];

  constructor(public readonly service: CrudOrderService) {}
}
