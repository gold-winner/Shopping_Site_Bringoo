import { Pipe, PipeTransform } from '@angular/core';
import { differenceInMinutes } from 'date-fns';

@Pipe({ name: 'deliveryTime' })
export class DeliveryTimePipe implements PipeTransform {
  transform(deliveryDateTimeFrom?: string, deliveryDateTimeTo?: string): number {
    return deliveryDateTimeFrom && deliveryDateTimeTo
      ? differenceInMinutes(new Date(deliveryDateTimeTo), new Date(deliveryDateTimeFrom))
      : 0;
  }
}
