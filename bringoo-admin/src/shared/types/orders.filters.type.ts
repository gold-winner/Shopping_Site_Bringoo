import { OrderStatusEnum } from '../api/auth/data-contracts';

export type OrdersFiltersType<T = string[]> = {
  search?: string | null;
  storeId?: string | null;
  storeRegionCode?: T | null;
  orderStatus?: OrderStatusEnum[] | null;
  dateStart?: string | null;
  dateEnd?: string | null;
  hasReplacement?: 'showAll' | boolean | null;
  tags?: string[];
};
