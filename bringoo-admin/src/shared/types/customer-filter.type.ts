import { LangCodeEnum } from '../api/auth/data-contracts';

export type CustomerFilterType = {
  search?: string;
  role?: null | 'CUSTOMER' | 'GUEST';
  softDelete?: boolean | string;
  tags: string[];
  language: LangCodeEnum | null;
};
