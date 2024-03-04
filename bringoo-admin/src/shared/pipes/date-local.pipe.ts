import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { utcToZonedTime } from 'date-fns-tz';

@Pipe({ name: 'dateLocal' })
export class DateLocalPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) public locale: string) {}

  transform(utc: number | string | Date, timeZone: string, format: string): string {
    const zonedDate: Date = utcToZonedTime(new Date(utc), timeZone);
    return formatDate(zonedDate, format, this.locale);
  }
}
