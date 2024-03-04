import { OrderStatusEnum } from '../api/auth/data-contracts';
import { ORDER_CANCEL_STATUSES } from './order-cancel-statuses.config';
import { ORDER_COMPLETE_STATUSES } from './order-complete-statuses.config';

export const ORDER_END_STATUSES: Set<OrderStatusEnum> = new Set([...ORDER_CANCEL_STATUSES, ...ORDER_COMPLETE_STATUSES]);
