import { getDay } from 'date-fns';

import { CustomerOrdersHeatMapDto, HeatMapChartValueDto } from '../api/auth/data-contracts';
import { CalendarDataType, CalendarSeries } from '../types/calendar-data.type';
import { WeekDayName } from './week-day-name';

export function OrdersHeatMapToCalendar({ chartValue, count }: CustomerOrdersHeatMapDto): { data: CalendarDataType[]; count: number } {
  if (count === 0) {
    return { data: [], count };
  }

  const firstWeek: HeatMapChartValueDto[] = chartValue.splice(0, 8 - getDay(new Date(chartValue[0].label)));

  const groupByWeeks: HeatMapChartValueDto[][] = [
    firstWeek,
    ...chartValue.reduce((groupByWeeks: HeatMapChartValueDto[][], cartValueDto: HeatMapChartValueDto, index: number) => {
      if (index % 7 === 0) {
        groupByWeeks.push([cartValueDto]);
      } else {
        groupByWeeks[groupByWeeks.length - 1].push(cartValueDto);
      }
      return groupByWeeks;
    }, []),
  ];

  const dates: CalendarDataType[] = groupByWeeks.map((value: HeatMapChartValueDto[]) => {
    const name: string = new Date(value[0].label).toString();
    const series: CalendarSeries[] = value
      .map(({ value, label, count }: HeatMapChartValueDto) => ({
        value,
        name: WeekDayName.format(new Date(label)),
        date: new Date(label),
        count,
      }))
      .reverse();

    return {
      name,
      series,
    };
  });

  return { data: dates, count };
}
