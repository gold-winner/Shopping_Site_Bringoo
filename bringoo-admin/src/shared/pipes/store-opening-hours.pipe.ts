import { Pipe, PipeTransform } from '@angular/core';
import { isWithinInterval, parse } from 'date-fns';

import { StoreOpeningHourEntity } from '../api/auth/data-contracts';
import { DATE_FORMAT } from '../config/constants.config';

@Pipe({ name: 'storeOpeningHours' })
export class StoreOpeningHoursPipe implements PipeTransform {
  transform(openingHours?: StoreOpeningHourEntity[]): string {
    if (!openingHours || openingHours.length === 0) {
      return 'Closed';
    }

    if (openingHours.length === 1) {
      return `${openingHours[0].timeStart} - ${openingHours[0].timeEnd}`;
    }

    const correctHours: StoreOpeningHourEntity | undefined = openingHours.find(({ dateStart = '', dateEnd = '' }: StoreOpeningHourEntity) =>
      isWithinInterval(new Date(), {
        start: parse(dateStart, DATE_FORMAT, new Date()),
        end: parse(dateEnd, DATE_FORMAT, new Date()),
      }),
    );

    if (correctHours) {
      return `${correctHours.timeStart} - ${correctHours.timeEnd}`;
    }

    return `${openingHours[0].timeStart} - ${openingHours[0].timeEnd}`;
  }
}
