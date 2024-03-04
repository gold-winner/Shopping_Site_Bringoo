import { Pipe, PipeTransform } from '@angular/core';
import { differenceInMinutes, parse } from 'date-fns';

import { DATE_TIME_FORMAT } from '../config/constants.config';

@Pipe({ name: 'delayTime' })
export class DelayTimePipe implements PipeTransform {
  transform(dateTimeExpect?: string, dateTimeComplete?: string): number | undefined {
    if (!dateTimeExpect || !dateTimeComplete) {
      return;
    }
    const diff: number = differenceInMinutes(new Date(dateTimeComplete), parse(dateTimeExpect, DATE_TIME_FORMAT, new Date()));

    return diff * 60 * 1000;
  }
}
