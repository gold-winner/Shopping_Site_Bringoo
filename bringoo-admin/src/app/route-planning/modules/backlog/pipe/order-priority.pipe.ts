import { Pipe, PipeTransform } from '@angular/core';

import { OrderPriorityEnum } from '../../../../../shared/api/auth/data-contracts';
import { iconType } from '../../../../../shared/components/icon/icon.type';

@Pipe({ name: 'orderPriority' })
export class OrderPriorityPipe implements PipeTransform {
  transform(value: OrderPriorityEnum): { icon: iconType; color: string } | null {
    switch (value) {
      case OrderPriorityEnum.LOW: {
        return {
          icon: 'low',
          color: 'rgb(0,101,255)',
        };
      }
      case OrderPriorityEnum.MEDIUM: {
        return {
          icon: 'medium',
          color: 'rgb(255,171,0)',
        };
      }
      case OrderPriorityEnum.HIGH: {
        return {
          icon: 'high',
          color: 'rgb(255,86,48)',
        };
      }
      case OrderPriorityEnum.PREMIUM:
        return {
          icon: 'star',
          color: 'rgb(246,61,23)',
        };
    }
    return null;
  }
}
