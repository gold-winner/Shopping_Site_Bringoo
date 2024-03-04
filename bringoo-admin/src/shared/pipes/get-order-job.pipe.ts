import { Pipe, PipeTransform } from '@angular/core';

import { OrderJobDto } from '../api/auth/data-contracts';

@Pipe({ name: 'getOrderJobDto' })
export class GetOrderJobPipe implements PipeTransform {
  transform(value?: OrderJobDto[], jobType?: string): OrderJobDto | undefined {
    if (!value) {
      return;
    }
    return value.find((v: OrderJobDto) => v.jobType === jobType);
  }
}
