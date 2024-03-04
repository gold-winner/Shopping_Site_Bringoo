import { ChangeDetectionStrategy, Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataset, TooltipCallbacks, TooltipItem } from 'chart.js';
import { addDays, format, parse } from 'date-fns';

import { BarChartValueDto, DashboardStackedChartItemDto, OrderCountersDto } from '../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../shared/config/constants.config';
import { ORDER_GROUP_STATUSES } from '../../constants/order-group-statuses.cont';
import { OrderGroupStatusesType } from '../../types/order-group-statuses.type';
import { OrdersToChartGroupType } from '../../types/orders-to-chart-group.type';

@Component({
  selector: 'app-order-forecast',
  host: { class: 'd-block' },
  templateUrl: 'order-forecast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderForecastComponent implements OnInit {
  @Input() currentWeekOrderCounters!: OrderCountersDto[];
  @Input() previousWeekOrderCounters!: OrderCountersDto[];

  @Input() redirectOnClick: boolean = false;
  today: string = format(new Date(), DATE_FORMAT);

  orderGroupStatuses: OrderGroupStatusesType = ORDER_GROUP_STATUSES;

  stackedBarData!: { labels: string[]; series: ChartDataset[] };

  callbacks!: Partial<TooltipCallbacks<'bar'>>;

  currentWeekStackTitle: string = 'Current Week';
  previousWeekStackTitle: string = 'Previous Week';
  private weekDates: string[] = [];
  private weekLabels: string[] = [];

  constructor(private readonly router: Router, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.setData();
  }

  setData(): void {
    this.weekDates = this.currentWeekOrderCounters.map(({ label }: OrderCountersDto) => label);
    this.callbacks = {
      title: (tooltipItems: TooltipItem<'bar'>[]): string | string[] => {
        const label: string = this.weekDates[tooltipItems[0].dataIndex];
        const isPreviousTip: boolean = tooltipItems[0].dataset.stack === this.previousWeekStackTitle;

        if (isPreviousTip) {
          return format(addDays(parse(label, DATE_FORMAT, new Date()), -7), DATE_FORMAT);
        }

        return label;
      },
    };

    this.weekLabels = this.weekDates.map((label: string) => {
      return this.today === label ? 'Today' : parse(label, DATE_FORMAT, new Date()).toLocaleDateString('en-US', { weekday: 'long' });
    });

    this.stackedBarData = {
      labels: this.weekLabels,
      series: this.getSeries(),
    };
  }

  getSeries(): ChartDataset[] {
    const currentWeek: ChartDataset[] = this.seriesForWeek(this.currentWeekOrderCounters, this.currentWeekStackTitle);

    const prevWeek: ChartDataset[] = this.seriesForWeek(this.previousWeekOrderCounters, this.previousWeekStackTitle);

    return [...currentWeek, ...prevWeek];
  }

  seriesForWeek(counters: OrderCountersDto[], stackTitle: string): ChartDataset[] {
    const ordersByGroup: ChartDataset[] = [];

    const orderGroupNames: string[] = Object.keys(this.orderGroupStatuses);

    for (const [index, groupName] of orderGroupNames.entries()) {
      const chartDataSet: ChartDataset = this.getOrderCountersByStatusGroup({
        counters,
        statusArray: this.orderGroupStatuses[groupName].statuses,
        showLabels: index === orderGroupNames.length - 1,
        stackTitle,
        label: groupName,
        color: this.orderGroupStatuses[groupName].color,
        hoverColor: this.orderGroupStatuses[groupName].hoverColor,
      });
      ordersByGroup.push(chartDataSet);
    }

    return ordersByGroup;
  }

  getOrderCountersByStatusGroup({
    counters,
    label,
    stackTitle,
    statusArray,
    showLabels,
    color,
    hoverColor,
  }: OrdersToChartGroupType): ChartDataset {
    const data: number[] = counters.map((value: OrderCountersDto): number => {
      const itemsWithCurrentStatuses: DashboardStackedChartItemDto[] = value.items.filter(({ orderStatus }: DashboardStackedChartItemDto) =>
        statusArray.includes(orderStatus),
      );

      return itemsWithCurrentStatuses.reduce((prev: number, { value }: DashboardStackedChartItemDto) => value + prev, 0);
    });

    return {
      data,
      label: label,
      stack: stackTitle,
      backgroundColor: color,
      datalabels: {
        display: showLabels,
      },
      hoverBackgroundColor: hoverColor,
    };
  }

  onBarClick(value: BarChartValueDto & { stack?: string }): void {
    const index: number = value.value;
    let date: string = this.weekDates[index];

    if (value.stack === this.previousWeekStackTitle) {
      date = format(addDays(parse(date, DATE_FORMAT, new Date()), -7), DATE_FORMAT);
    }

    this.ngZone.run(() => {
      this.router.navigate(['orders', 'order-board'], { queryParams: { date } });
    });
  }
}
