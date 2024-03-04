import { Pipe, PipeTransform } from '@angular/core';

import { OrderJobEntity, StaffEntity } from '../api/auth/data-contracts';

@Pipe({
  name: 'jobFindStaff',
})
export class JobFindStaffPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value?: OrderJobEntity[], jobType?: string): StaffEntity | undefined {
    if (!value) {
      return;
    }
    return value.find((v: OrderJobEntity) => v.jobType === jobType)?.staff;
  }
}
