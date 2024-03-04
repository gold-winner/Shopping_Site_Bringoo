import { addMinutes, differenceInDays, differenceInMinutes, format, parse } from 'date-fns';

import { OrderJobEntity, OrderStatusEnum } from '../api/auth/data-contracts';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '../config/constants.config';

export function orderDelayTime(date: number | string, orderStatus: OrderStatusEnum, jobs?: OrderJobEntity[]): string {
  const delivery_date: Date = typeof date === 'number' ? new Date(date) : parse(date, DATE_TIME_FORMAT, new Date());
  //todo remove hardcoded time zone get it from store
  const to_day: string = new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' });
  let dt: string = '0';

  switch (orderStatus) {
    case OrderStatusEnum.COMPLETE:
    case OrderStatusEnum.COMPLETE_TERMINATION_NO_REFUND:
    case OrderStatusEnum.COMPLETE_TERMINATION_REFUND: {
      const orderEndDate: string | undefined = jobs?.find((job: OrderJobEntity) => job.jobType === 'DRIVE')?.completeDateTime;
      if (orderEndDate) {
        const helperDate: Date = addMinutes(
          new Date(0, 0, 0, 0, 0, 0),
          //todo remove hardcoded time zone get it from store
          Math.abs(
            differenceInMinutes(delivery_date, new Date(new Date(orderEndDate).toLocaleString('en-US', { timeZone: 'Europe/Berlin' }))),
          ),
        );
        dt = `${format(helperDate, TIME_FORMAT)} h:m`;
      }
      break;
    }
    default: {
      const days: number = differenceInDays(new Date(to_day), delivery_date);
      if (days !== 0) {
        dt = `Days: ${days}`;
      } else {
        const helperDate: Date = addMinutes(new Date(0, 0, 0, 0, 0, 0), Math.abs(differenceInMinutes(new Date(to_day), delivery_date)));
        dt = `${format(helperDate, TIME_FORMAT)} h:m`;
      }
      break;
    }
  }

  return dt;
}
