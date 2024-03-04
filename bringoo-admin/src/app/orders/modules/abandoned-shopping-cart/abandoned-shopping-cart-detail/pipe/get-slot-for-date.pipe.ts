import { Pipe, PipeTransform } from '@angular/core';

import { DeliveryTimeSlot } from '../../../../../../shared/types/delivety-time-slot.type';

@Pipe({ name: 'getSlotForDate' })
export class GetSlotForDatePipe implements PipeTransform {
  transform(deliverySlots: DeliveryTimeSlot[], dateSlot: string): DeliveryTimeSlot[] {
    return deliverySlots.filter(({ date }: DeliveryTimeSlot) => date === dateSlot);
  }
}
