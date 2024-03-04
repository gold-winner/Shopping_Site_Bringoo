import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ChartDataset } from 'chart.js';

import { DashboardStackedChartItemDto, OrderCountersDto } from '../../../../shared/api/auth/data-contracts';
import { ORDER_GROUP_STATUSES } from '../../constants/order-group-statuses.cont';
import { OrderGroupStatusesType } from '../../types/order-group-statuses.type';
import { OrdersToChartGroupType } from '../../types/orders-to-chart-group.type';

@Component({
  selector: 'app-orders-by-hour',
  host: { class: 'd-block' },
  templateUrl: 'orders-by-hour.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersByHourComponent implements OnInit {
  @Input() orderCounters!: OrderCountersDto[];

  orderGroupStatuses: OrderGroupStatusesType = ORDER_GROUP_STATUSES;

  stackedBarData!: { labels: string[]; series: ChartDataset[] };

  ngOnInit(): void {
    this.setData();
  }

  setData(): void {
    this.stackedBarData = {
      labels: this.orderCounters.map(({ label }: OrderCountersDto) => label),
      series: this.getSeries(),
    };
  }

  getSeries(): ChartDataset[] {
    const ordersByGroup: ChartDataset[] = [];

    const orderGroupNames: string[] = Object.keys(this.orderGroupStatuses);

    for (const [index, groupName] of orderGroupNames.entries()) {
      const chartDataSet: ChartDataset = this.createStackByOrderStatusGroup({
        statusArray: this.orderGroupStatuses[groupName].statuses,
        showLabels: index === orderGroupNames.length - 1,
        label: groupName,
        color: this.orderGroupStatuses[groupName].color,
        hoverColor: this.orderGroupStatuses[groupName].hoverColor,
      });
      ordersByGroup.push(chartDataSet);
    }

    return ordersByGroup;
  }

  createStackByOrderStatusGroup({
    statusArray,
    label,
    showLabels,
    color,
    hoverColor,
  }: Omit<OrdersToChartGroupType, 'counters' | 'stackTitle'>): ChartDataset {
    const data: number[] = this.orderCounters.map((value: OrderCountersDto): number => {
      const itemsWithCurrentStatuses: DashboardStackedChartItemDto[] = value.items.filter(({ orderStatus }: DashboardStackedChartItemDto) =>
        statusArray.includes(orderStatus),
      );
      return itemsWithCurrentStatuses.reduce((prev: number, { value }: DashboardStackedChartItemDto) => value + prev, 0);
    });

    return {
      data,
      label,
      stack: 'a',
      backgroundColor: color,
      datalabels: {
        display: showLabels,
      },
      hoverBackgroundColor: hoverColor,
    };
  }
}
