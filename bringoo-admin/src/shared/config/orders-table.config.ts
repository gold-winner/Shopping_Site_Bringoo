import { OrderEntity, OrderStatusEnum } from '../api/auth/data-contracts';
import { DEFAULT_CURRENCY_SYMBOL } from '../const/default-currency-symbol.const';
import { CrudColumn, EntityValue } from '../modules/crud/interfaces/crud-column';
import { CrudFields } from '../modules/crud/types/crud-select.type';

export const IGNORE_ORDER_STATUSES: OrderStatusEnum[] = [OrderStatusEnum.REJECTED, OrderStatusEnum.REJECTED_BY_CUSTOMER];

export const ORDER_TABLE_FIELDS: CrudFields<OrderEntity> = [
  'orderNumber',
  'isActive',
  'grandTotal',
  'deliveryDate',
  'customerId',
  'create_date',
  'orderQuantityRequested',
  'orderQuantityFound',
  'orderStatus',
  'storeId',
  'deliveryDistance',
  'actualOrderWeight',
  'isAlcohol',
  'payDate',
  'deliveryDateTimeFrom',
  'deliveryDateTimeTo',
  'tags',
  'hasReplacement',
  'replacementCounter',
  'completeTime',
];
export const ORDERS_TABLE_JOIN: string[] = [
  'store||name_i18n',
  'store.currency||symbol',
  'store.region||name_i18n',
  'orderTransactions||currencyCode',
  'orderBillingAddress||firstName,lastName',
  'orderVoucher||orderItemsDiscount,deliveryFeeDiscount',
];

export const ORDERS_TABLE_COLUMNS: CrudColumn<OrderEntity>[] = [
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
    label: 'Customer',
    isSortable: true,
    sortBy: 'orderBillingAddress.firstName,orderBillingAddress.lastName',
    getField(item: OrderEntity): EntityValue {
      return `${item.orderBillingAddress?.firstName} ${item.orderBillingAddress?.lastName}`;
    },
    type: 'link',
    link(item: OrderEntity): string {
      return `/users/customers/details/${item.customerId}`;
    },
  },
  {
    label: 'Store',
    isSortable: false,
    getField(item: OrderEntity): EntityValue {
      return item?.store?.name_i18n;
    },
    type: 'link',
    link(item: OrderEntity): string {
      return `/store/stores/${item.storeId}/basic-information`;
    },
  },

  {
    label: 'Store Region',
    isSortable: false,
    getField(item: OrderEntity): EntityValue {
      return item?.store?.region?.name_i18n;
    },
    type: 'text',
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
    label: 'Tags',
    isSortable: false,
    getField(item: OrderEntity): EntityValue {
      return item.tags ?? [];
    },
    type: 'tags',
  },
  {
    label: 'Replacement Count',
    isSortable: true,
    sortBy: 'replacementCounter',
    getField(item: OrderEntity): EntityValue {
      return item.replacementCounter;
    },
    type: 'text',
  },
  {
    label: 'Replacement',
    isSortable: false,
    getField(item: OrderEntity): EntityValue {
      return item.hasReplacement;
    },
    type: 'boolean',
    boolean: {
      falseText: 'No',
      trueText: 'Yes',
    },
  },
  {
    label: 'Date Submit',
    isSortable: true,
    sortBy: 'payDate',
    getField(item: OrderEntity): EntityValue {
      return item?.payDate;
    },
    type: 'date',
    dateFormat: 'short',
  },
  {
    label: 'Expected Delivery Start',
    isSortable: true,
    sortBy: 'deliveryDateTimeFrom',
    getField(item: OrderEntity): EntityValue {
      return item.deliveryDateTimeFrom ? new Date(item.deliveryDateTimeFrom).valueOf() : null;
    },
    type: 'date',
    dateFormat: 'short',
  },
  {
    label: 'Expected Delivery End',
    isSortable: true,
    sortBy: 'deliveryDateTimeTo',
    getField(item: OrderEntity): EntityValue {
      return item.deliveryDateTimeTo ? new Date(item.deliveryDateTimeTo).valueOf() : null;
    },
    type: 'date',
    dateFormat: 'short',
  },
  {
    label: 'Order Completed',
    isSortable: true,
    sortBy: '',
    getField(item: OrderEntity): EntityValue {
      return item.completeTime;
    },
    type: 'date',
    dateFormat: 'short',
  },
  {
    label: 'Distance',
    isSortable: true,
    sortBy: 'deliveryDistance',
    getField(item: OrderEntity): EntityValue {
      return `${((item.deliveryDistance ?? 0) / 1000).toFixed(2)} km`;
    },
    type: 'text',
    align: 'right',
  },
  {
    label: 'Actual weight',
    isSortable: true,
    sortBy: 'actualOrderWeight',
    getField(item: OrderEntity): EntityValue {
      return item.actualOrderWeight ? `${(item.actualOrderWeight / 1000).toFixed(2)} kg` : '---';
    },
    type: 'text',
    align: 'right',
  },
  {
    label: 'Ordered Items',
    isSortable: true,
    sortBy: 'orderQuantityRequested',
    getField(item: OrderEntity): EntityValue {
      return item.orderQuantityRequested;
    },
    type: 'text',
    align: 'right',
  },
  {
    label: 'Found Items',
    isSortable: true,
    sortBy: 'orderQuantityFound',
    getField(item: OrderEntity): EntityValue {
      return item?.orderQuantityFound;
    },
    type: 'text',
    align: 'right',
  },
  {
    label: 'Grand Total Price',
    isSortable: true,
    sortBy: 'grandTotal',

    /**
     * @description referenced at mapOrderEntityToDto method in backend order.service.ts
     */
    getField(item: OrderEntity): EntityValue {
      const itemsDiscount: number = item.orderVoucher?.orderItemsDiscount ?? 0;
      const deliveryFeeDiscount: number = item.orderVoucher?.deliveryFeeDiscount ?? 0;

      const allDiscount: number = itemsDiscount + deliveryFeeDiscount;
      const subTotalDiscounted: number = (item.grandTotal ?? 0) - allDiscount;

      return `${subTotalDiscounted.toFixed(2)} ${item.store?.currency?.symbol ?? DEFAULT_CURRENCY_SYMBOL}`;
    },
    type: 'text',
    align: 'right',
  },
];
