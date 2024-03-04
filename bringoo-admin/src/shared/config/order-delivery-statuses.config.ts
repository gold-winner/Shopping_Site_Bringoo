import { OrderStatusEnum } from '../api/auth/data-contracts';

export const ORDER_DELIVERY_STATUSES: Set<OrderStatusEnum> = new Set([
  OrderStatusEnum.DELIVERY_STARTED,
  OrderStatusEnum.DELIVERY,
  OrderStatusEnum.SHIPMENT,
]);
