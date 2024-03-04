import { Pipe, PipeTransform } from '@angular/core';

import { OrderJobEntity, OrderJobTypeEnum } from '../api/auth/data-contracts';

@Pipe({
  name: 'findJobType',
})
export class FindJobTypePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value?: OrderJobEntity[], jobType?: OrderJobTypeEnum): OrderJobEntity | Record<string, any> {
    if (!value) {
      return {};
    }
    return value.find((v: OrderJobEntity) => v.jobType === jobType) ?? {};
  }
}
