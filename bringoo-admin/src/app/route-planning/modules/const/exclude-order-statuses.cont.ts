import { OrderStatusEnum } from '../../../../shared/api/auth/data-contracts';

export const EXCLUDE_ORDER_STATUSES: OrderStatusEnum[] = [
  OrderStatusEnum.REJECTED,
  OrderStatusEnum.REJECTED_BY_CUSTOMER,
  OrderStatusEnum.CANCELED,
  OrderStatusEnum.PAYMENT_EXPIRED,
  OrderStatusEnum.PAYMENT_PENDING,
  OrderStatusEnum.PAYMENT_ERROR,
];
