import { Pipe, PipeTransform } from '@angular/core';

import { OrderStatusEnum } from '../../../../../shared/api/auth/data-contracts';
import { ORDER_DELIVERY_STATUSES } from '../../../../../shared/config/order-delivery-statuses.config';
import { ORDER_NEW_STATUSES } from '../../../../../shared/config/order-new-statuses.config';
import { ORDER_PICKER_STATUSES } from '../../../../../shared/config/order-picker-statuses.config';

@Pipe({ name: 'orderStatusIcon' })
export class OrderStatusIconPipe implements PipeTransform {
  completeExclamation: OrderStatusEnum[] = [OrderStatusEnum.COMPLETE_TERMINATION_REFUND, OrderStatusEnum.COMPLETE_TERMINATION_NO_REFUND];

  transform(value: OrderStatusEnum): 'dollar' | 'to-top' | 'car' | 'check-circle' | 'exclamation-circle' | 'stop' {
    if (ORDER_NEW_STATUSES.has(value)) return 'dollar';
    if (ORDER_PICKER_STATUSES.has(value)) return 'to-top';
    if (ORDER_DELIVERY_STATUSES.has(value)) return 'car';
    if (value === OrderStatusEnum.COMPLETE) return 'check-circle';
    if (this.completeExclamation.includes(value)) return 'exclamation-circle';

    return 'stop';
  }
}
