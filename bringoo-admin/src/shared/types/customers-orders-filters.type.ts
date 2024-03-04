import { CustomerRoleEnum } from '../api/auth/data-contracts';

export type CustomersOrdersFiltersType = {
  role?: CustomerRoleEnum;
  tags?: string[];
  dateStart?: string;
  dateEnd?: string;
};
