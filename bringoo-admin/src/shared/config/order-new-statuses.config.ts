import { OrderStatusEnum } from '../api/auth/data-contracts';

export const ORDER_NEW_STATUSES: Set<OrderStatusEnum> = new Set([
  OrderStatusEnum.NEW,
  OrderStatusEnum.PAYMENT_PENDING,
  OrderStatusEnum.PAYMENT_ERROR,
  OrderStatusEnum.PAYMENT_EXPIRED,
  OrderStatusEnum.PAID,
  OrderStatusEnum.PENDING,
  OrderStatusEnum.READY,
]);
