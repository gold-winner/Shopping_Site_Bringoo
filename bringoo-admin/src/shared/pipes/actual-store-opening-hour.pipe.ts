import { Pipe, PipeTransform } from '@angular/core';
import { isWithinInterval, parse } from 'date-fns';

import { StoreOpeningHourEntity } from '../api/auth/data-contracts';
import { DATE_FORMAT } from '../config/constants.config';

@Pipe({ name: 'actualStoreOpeningHour' })
export class ActualStoreOpeningHourPipe implements PipeTransform {
  transform(storeOpeningHours: StoreOpeningHourEntity[] | undefined): StoreOpeningHourEntity | null {
    if (!storeOpeningHours || storeOpeningHours.length === 0) return null;

    return (
      storeOpeningHours.find(({ dateStart, dateEnd }: StoreOpeningHourEntity) => {
        if (!dateStart || !dateEnd) return false;

        return isWithinInterval(new Date(), {
          start: parse(dateStart, DATE_FORMAT, new Date()),
          end: parse(dateEnd, DATE_FORMAT, new Date()),
        });
      }) ?? null
    );
  }
}
