import { OrderStatusEnum } from '../api/auth/data-contracts';

export const ORDER_CANCEL_STATUSES: Set<OrderStatusEnum> = new Set<OrderStatusEnum>([
  OrderStatusEnum.CANCELED,
  OrderStatusEnum.REJECTED_BY_CUSTOMER,
  OrderStatusEnum.CANCELED_BY_MANAGER,
  OrderStatusEnum.CANCELED_NO_PRODUCT,
]);
