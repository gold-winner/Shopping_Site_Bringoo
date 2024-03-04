import { ChangeDetectionStrategy, Component, Type } from '@angular/core';

import { CrudOrderVoucherService } from '../../../../../../shared/api/auth/crud-order-voucher.service';
import { OrderVoucherEntity } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../shared/modules/crud/types/crud-select.type';
import { VoucherOrdersFilterFormComponent } from '../voucher-orders-filter-form/voucher-orders-filter-form.component';

@Component({
  selector: 'app-voucher-orders',
  templateUrl: './voucher-orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoucherOrdersComponent {
  filterForm: Type<DynamicFilterFormComponent> = VoucherOrdersFilterFormComponent;

  fields: CrudFields<OrderVoucherEntity> = ['orderId', 'create_date'];
  join: string[] = ['order', 'order.store', 'voucher', 'order.customer', 'order.customer.settings'];

  config: CrudConfig = {
    title: 'Voucher orders',
    plural: 'Voucher orders',
    single: 'Voucher order',
    isActionColumnVisible: false,
    isCreateButtonVisible: false,
    isEditButtonVisible: false,
    isDeleteButtonVisible: false,
    isDragged: false,
    formWidth: 1000,
  };

  columns: CrudColumn<OrderVoucherEntity>[] = [
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      getField(item: OrderVoucherEntity): EntityValue {
        return item?.order?.isActive;
      },
      type: 'boolean',
      boolean: {
        trueText: 'Active',
        falseText: 'Inactive',
      },
    },
    {
      label: 'Order',
      isSortable: false,
      getField(item: OrderVoucherEntity): EntityValue {
        return `${item?.order?.orderNumber}`;
      },
      type: 'link',
      link(item: OrderVoucherEntity): string {
        return `/orders/all/detail/${item?.orderId}`;
      },
    },
    {
      label: 'Customer',
      isSortable: true,
      sortBy: 'item.order.customer.settings.firstName, item.order.customer.settings.lastName',
      getField(item: OrderVoucherEntity): EntityValue {
        return `${item?.order?.customer?.settings?.firstName} ${item?.order?.customer?.settings?.lastName}`;
      },
      type: 'link',
      link(item: OrderVoucherEntity): string {
        return `/users/customers/details/${item?.order?.customerId}`;
      },
    },
    {
      label: 'Store',
      isSortable: true,
      sortBy: 'item.orderTransaction.order.store.name_i18n',
      getField(item: OrderVoucherEntity): EntityValue {
        return `${item.order?.store?.name_i18n}`;
      },
      type: 'link',
      link(item: OrderVoucherEntity): string {
        return `/store/stores/${item.order?.store?.id}/basic-information`;
      },
    },
    {
      label: 'Order Status',
      isSortable: true,
      sortBy: 'item.order.orderStatus',
      getField(item: OrderVoucherEntity): EntityValue {
        return `${item.order?.orderStatus}`;
      },
      type: 'text',
    },
    {
      label: 'Delivery time',
      isSortable: true,
      sortBy: 'item.order.actualDeliveryTime',
      getField(item: OrderVoucherEntity): EntityValue {
        return `${item.order?.actualDeliveryTime || ''}`;
      },
      type: 'text',
    },
  ];

  constructor(public readonly service: CrudOrderVoucherService) {}
}
