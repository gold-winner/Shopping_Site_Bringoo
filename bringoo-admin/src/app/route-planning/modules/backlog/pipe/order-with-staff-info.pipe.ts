import { Pipe, PipeTransform } from '@angular/core';

import { KeyPointCreateInput, OrdersWithStaffInformationDto } from '../../../../../shared/api/auth/data-contracts';

@Pipe({ name: 'orderWithStaffInfo' })
export class OrderWithStaffInfoPipe implements PipeTransform {
  transform(value: KeyPointCreateInput | OrdersWithStaffInformationDto): OrdersWithStaffInformationDto | null {
    if ('orderStatus' in value) {
      return value;
    }
    return null;
  }
}
