import { OrderStatusEnum } from '../../../shared/api/auth/data-contracts';

export type OrderGroupStatusesType = Record<
  string,
  {
    color: string;
    hoverColor: string;
    statuses: OrderStatusEnum[];
  }
>;
