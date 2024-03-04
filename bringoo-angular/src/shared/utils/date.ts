import * as moment from 'moment';

type dayOfWeek = {
  day: string;
  date: string;
};

export function getWeekData(): Array<any> {
  const currentDate: moment.Moment = moment();
  const weekStart: moment.Moment = currentDate.clone().startOf('isoWeek');
  const dates: Array<any> = [];

  for (let i: number = 0; i < 7; i++) {
    const next: moment.Moment = moment(weekStart).add(i, 'days');
    const item: any = {};
    const rowItem: dayOfWeek = {} as dayOfWeek;

    rowItem.day = next.format('dddd');

    if (i === currentDate.day() - 1) {
      rowItem.date = `${next.format('D')} (Today)`;
      item.color = 'green';
    } else {
      rowItem.date = next.format('D');
    }

    item.id = i;
    item.value = `${rowItem.day}  ·${currentDate.format('D')} ${currentDate.format('MMMM')}`;
    item.rowItem = rowItem;
    dates.push(item);
  }

  return dates;
}
