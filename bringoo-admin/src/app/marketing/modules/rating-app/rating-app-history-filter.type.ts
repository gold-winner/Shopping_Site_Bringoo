import { OsEnum } from '../../../../shared/api/auth/data-contracts';

export type RatingAppHistoryFilter = {
  search?: string;
  dateStart?: string;
  dateEnd?: string;
  deviceOs?: OsEnum;
};
