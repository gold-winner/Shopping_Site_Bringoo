import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { eachMonthOfInterval, format, parse } from 'date-fns';

import { BarChartValueDto, CustomersOrderCountDto } from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { CohortGridEnum } from '../../../../../../../../shared/enums/cohort-grid.enum';

@Component({
  selector: 'app-cohort-grid',
  templateUrl: 'cohort-grid.component.html',
  styleUrls: ['cohort-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CohortGridComponent implements OnInit {
  @Input() set cohortData(value: CustomersOrderCountDto[] | null) {
    if (value) {
      this._cohortData = value;
      this.buildGrid();
      this.buildTotalCount();
      this.buildNewCustomersPerMonth();
    }
  }

  @Input() dates!: { dateStart: string; dateEnd: string };

  private _cohortData!: CustomersOrderCountDto[];
  private dateEnd!: Date;
  private dateStart!: Date;
  @Input() customersOverTime!: BarChartValueDto[];

  @Input() gridType: CohortGridEnum = CohortGridEnum.ORDERS_COUNT;

  monthsLabels: string[] = [];
  monthsInterval: Date[] = [];

  grid: (CustomersOrderCountDto | null)[][] = [];
  totalOrdersCount: number[] = [];
  totalOrdersMoney: number[] = [];
  newCustomersPerMonth: number[] = [];

  totalOrdersPerMonth: number[] = [];
  totalMoneyPerMonth: number[] = [];

  totalOrders: number = 0;
  totalMoney: number = 0;

  ngOnInit(): void {
    this.buildMonthsList();
    this.buildGrid();
    this.buildTotalCount();
    this.buildNewCustomersPerMonth();
  }

  private buildMonthsList(): void {
    this.dateStart = parse(this.dates.dateStart, DATE_FORMAT, new Date());
    this.dateEnd = parse(this.dates.dateEnd, DATE_FORMAT, new Date());
    this.monthsInterval = eachMonthOfInterval({ start: this.dateStart, end: this.dateEnd });

    this.monthsLabels = this.monthsInterval.map((date: Date) => date.toLocaleDateString('default', { month: 'short' }));
  }

  private buildGrid(): void {
    const length: number = this.monthsLabels.length;
    this.grid = [];

    for (let rowMonthIndex: number = 0; rowMonthIndex < length; rowMonthIndex++) {
      const rowMounts: (CustomersOrderCountDto | null)[] = [];

      for (let colMonthIndex: number = 0; colMonthIndex < length; colMonthIndex++) {
        rowMounts.push(this.getMonthValue(rowMonthIndex, colMonthIndex));
      }

      this.grid.push(rowMounts);
    }
  }

  private getMonthValue(rowIndex: number, columnIndex: number): CustomersOrderCountDto | null {
    const columnMonth: Date = this.monthsInterval[columnIndex];
    const rowMonth: Date = this.monthsInterval[rowIndex];

    const customersOrderCount: CustomersOrderCountDto | undefined = this._cohortData.find((dto: CustomersOrderCountDto) =>
      this.isDtoForCurrentCell(columnMonth, rowMonth, dto),
    );

    return customersOrderCount ?? null;
  }

  isDtoForCurrentCell(colMonth: Date, rowMonth: Date, { userSignUpDate, orderCreateDate }: CustomersOrderCountDto): boolean {
    const registrationDate: Date = parse(userSignUpDate, 'yyyy-MM', new Date());
    const orderDate: Date = parse(orderCreateDate, 'yyyy-MM', new Date());

    const isUserRegisteredOnRowDate: boolean =
      registrationDate.getMonth() === rowMonth.getMonth() && registrationDate.getFullYear() === rowMonth.getFullYear();

    const isOrderCreatedOnColDate: boolean =
      orderDate.getMonth() === colMonth.getMonth() && orderDate.getFullYear() === colMonth.getFullYear();

    const isDtoForCurrentCell: boolean = isUserRegisteredOnRowDate && isOrderCreatedOnColDate;

    return isDtoForCurrentCell;
  }

  buildTotalCount(): void {
    const monthsCount: number = this.monthsLabels.length;

    this.totalOrdersCount = [];
    this.totalOrdersMoney = [];
    this.totalOrdersPerMonth = [];
    this.totalMoneyPerMonth = [];

    for (let col: number = 0; col < monthsCount; col++) {
      let totalOrders: number = 0;
      let totalMoney: number = 0;
      for (let row: number = 0; row < monthsCount; row++) {
        const cel: CustomersOrderCountDto | null = this.grid[row][col];
        if (cel) {
          totalMoney += cel.sumGrandTotal;
          totalOrders += cel.totalOrders;
        }
      }
      this.totalOrdersCount.push(totalOrders);
      this.totalOrdersMoney.push(totalMoney);
    }

    for (let row: number = 0; row < monthsCount; row++) {
      let totalOrdersInMonth: number = 0;
      let totalMoneyInMonth: number = 0;

      for (let col: number = 0; col < monthsCount; col++) {
        const cel: CustomersOrderCountDto | null = this.grid[row][col];
        if (cel) {
          totalOrdersInMonth += cel.totalOrders;
          totalMoneyInMonth += cel.sumGrandTotal;
        }
      }

      this.totalOrdersPerMonth.push(totalOrdersInMonth);
      this.totalMoneyPerMonth.push(totalMoneyInMonth);
    }

    this.totalMoney = this.totalMoneyPerMonth.reduce((sum: number, value: number) => sum + value, 0);
    this.totalOrders = this.totalOrdersPerMonth.reduce((sum: number, value: number) => sum + value, 0);
  }

  buildNewCustomersPerMonth(): void {
    this.newCustomersPerMonth = this.monthsInterval.map((date: Date): number => {
      const yearMonth: string = format(date, 'yyyy-MM');

      const newUsersPerMonth: BarChartValueDto | undefined = this.customersOverTime.find(
        ({ label }: BarChartValueDto) => label === yearMonth,
      );

      const count: number = newUsersPerMonth?.value ?? 0;

      return count;
    });
  }

  getEmptyValue(rowIndex: number, colIndex: number): number | string {
    return colIndex >= rowIndex ? 0 : '';
  }
}
