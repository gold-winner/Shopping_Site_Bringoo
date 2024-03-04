import { Pipe, PipeTransform } from '@angular/core';

import { OrderJobEntity, OrderStatusEnum } from '../api/auth/data-contracts';
import { orderDelayTime } from '../helpers/order-delay-time';

@Pipe({ name: 'orderWaitingTime' })
export class OrderWaitingTimePipe implements PipeTransform {
  transform(time?: string, orderStatus?: OrderStatusEnum, jobs?: OrderJobEntity[]): string | undefined {
    if (!time) {
      return;
    }
    return orderDelayTime(new Date(time).getTime(), orderStatus ?? OrderStatusEnum.NEW, jobs);
  }
}
