import { OrderStatusEnum } from '../api/auth/data-contracts';

export const ORDER_COMPLETE_STATUSES: Set<OrderStatusEnum> = new Set<OrderStatusEnum>([
  OrderStatusEnum.COMPLETE,
  OrderStatusEnum.COMPLETE_TERMINATION_NO_REFUND,
  OrderStatusEnum.COMPLETE_TERMINATION_REFUND,
]);
