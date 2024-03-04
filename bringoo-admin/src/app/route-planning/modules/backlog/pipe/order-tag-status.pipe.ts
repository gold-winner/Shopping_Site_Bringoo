import { Pipe, PipeTransform } from '@angular/core';

import { OrderStatusEnum } from '../../../../../shared/api/auth/data-contracts';
import { ORDER_CANCEL_STATUSES } from '../../../../../shared/config/order-cancel-statuses.config';
import { ORDER_COMPLETE_STATUSES } from '../../../../../shared/config/order-complete-statuses.config';
import { ORDER_DELIVERY_STATUSES } from '../../../../../shared/config/order-delivery-statuses.config';

@Pipe({ name: 'orderTagStatus' })
export class OrderTagStatusPipe implements PipeTransform {
  greenHex: string = '#52c41a';
  redHex: string = '#eb2f96';
  blueHex: string = '#1890ff';
  orange: string = '#D87A16';

  transform(value: OrderStatusEnum, isHex: boolean = false): string {
    if (ORDER_CANCEL_STATUSES.has(value)) {
      return isHex ? this.redHex : 'red';
    }

    if (ORDER_COMPLETE_STATUSES.has(value)) {
      return isHex ? this.greenHex : 'green';
    }

    if (ORDER_DELIVERY_STATUSES.has(value)) {
      return isHex ? this.orange : 'orange';
    }

    return isHex ? this.blueHex : 'blue';
  }
}
