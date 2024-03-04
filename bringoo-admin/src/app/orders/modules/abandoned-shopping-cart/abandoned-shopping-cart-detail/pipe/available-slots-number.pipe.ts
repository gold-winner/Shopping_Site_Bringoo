import { Pipe, PipeTransform } from '@angular/core';

import { TimeSlotDto } from '../../../../../../shared/api/auth/data-contracts';

@Pipe({ name: 'availableSlotsNumber' })
export class AvailableSlotsNumberPipe implements PipeTransform {
  transform(slots: TimeSlotDto[]): number {
    return slots.reduce((sum: number, { available }: TimeSlotDto) => sum + available, 0);
  }
}
