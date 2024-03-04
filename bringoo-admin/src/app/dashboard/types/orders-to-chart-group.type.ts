import { OrderCountersDto, OrderStatusEnum } from '../../../shared/api/auth/data-contracts';

export type OrdersToChartGroupType = {
  counters: OrderCountersDto[];
  statusArray: OrderStatusEnum[];
  label: string;
  color: string;
  hoverColor: string;
  stackTitle: string;
  showLabels: boolean;
};
