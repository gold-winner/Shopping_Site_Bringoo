import { OrderStatusEnum } from '../../../shared/api/auth/data-contracts';
import { OrderGroupStatusesType } from '../types/order-group-statuses.type';

export const ORDER_GROUP_STATUSES: OrderGroupStatusesType = {
  New: {
    color: 'rgba(0,0,255,0.4)',
    hoverColor: 'rgba(0,0,255,0.6)',
    statuses: [OrderStatusEnum.PAYMENT_PENDING, OrderStatusEnum.PENDING, OrderStatusEnum.READY],
  },
  Canceled: {
    color: 'rgba(255,0,0,0.4)',
    hoverColor: 'rgba(255,0,0,0.6)',
    statuses: [
      OrderStatusEnum.CANCELED,
      OrderStatusEnum.CANCELED_BY_MANAGER,
      OrderStatusEnum.CANCELED_NO_PRODUCT,
      OrderStatusEnum.PAYMENT_EXPIRED,
      OrderStatusEnum.PAYMENT_ERROR,
    ],
  },
  Picking: {
    color: 'rgba(255,255,0,0.3)',
    hoverColor: 'rgba(255,255,0,0.5)',
    statuses: [OrderStatusEnum.PICKING],
  },
  Delivery: {
    color: 'rgba(255,165,0,0.4)',
    hoverColor: 'rgba(255,165,0,0.6)',
    statuses: [OrderStatusEnum.DELIVERY, OrderStatusEnum.DELIVERY_STARTED, OrderStatusEnum.SHIPMENT],
  },
  Complete: {
    color: 'rgba(0,128,0,0.4)',
    hoverColor: 'rgba(0,128,0,0.6)',
    statuses: [OrderStatusEnum.COMPLETE, OrderStatusEnum.COMPLETE_TERMINATION_NO_REFUND, OrderStatusEnum.COMPLETE_TERMINATION_REFUND],
  },
};
