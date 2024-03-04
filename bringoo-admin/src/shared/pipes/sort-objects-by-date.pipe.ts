import { Pipe, PipeTransform } from '@angular/core';
import { parse } from 'date-fns';

import { DATE_FORMAT } from '../config/constants.config';

@Pipe({ name: 'sortObjectsByDate' })
export class SortObjectsByDatePipe implements PipeTransform {
  transform<T = any>(items: T[] | undefined, dataKey: keyof T, format: string = DATE_FORMAT, orderedBy: 'ASC' | 'DESC' = 'ASC'): T[] {
    if (!items) {
      return [];
    }

    if (items.length > 1) {
      return items.sort((prev: T, next: T) => {
        if (prev[dataKey] && next[dataKey]) {
          const prevDate: Date = parse(String(prev[dataKey]), format, new Date());
          const nextDate: Date = parse(String(next[dataKey]), format, new Date());

          return orderedBy === 'ASC' ? prevDate.getTime() - nextDate.getTime() : nextDate.getTime() - prevDate.getTime();
        }
        return 0;
      });
    }

    return items;
  }
}
