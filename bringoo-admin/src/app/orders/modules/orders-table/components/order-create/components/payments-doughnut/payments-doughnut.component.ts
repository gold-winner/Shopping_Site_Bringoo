import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChartDataset } from 'chart.js';
import { distinctUntilChanged, tap } from 'rxjs/operators';

import { OrderTransactionDto } from '../../../../../../../../shared/api/auth/data-contracts';
import { DEFAULT_CURRENCY_SYMBOL } from '../../../../../../../../shared/const/default-currency-symbol.const';
import { StringToNumberHelper } from '../../../../../../../../shared/helpers/string-to-number.helper';

@UntilDestroy()
@Component({
  selector: 'app-payments-doughnut',
  templateUrl: 'payments-doughnut.component.html',
  styleUrls: ['payments-doughnut.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsDoughnutComponent implements OnInit {
  viewModeController: UntypedFormControl = new UntypedFormControl(true);
  @Input() transactions!: OrderTransactionDto[];
  _currency: string = DEFAULT_CURRENCY_SYMBOL;

  @Input() set currency(currency: string | null | undefined) {
    if (currency) {
      this._currency = currency;
    }
  }

  private _orderSubTotal: number = 0;
  private _orderTotalOfDeliveryFee: number = 0;
  private _orderTotalOfDeposit: number = 0;
  private _orderTotalOfRefund: number = 0;
  private _orderPaidAmount: number = 0;

  @Input() set orderSubTotal(value: string) {
    this._orderSubTotal = StringToNumberHelper(value);
  }

  @Input() set orderTotalOfDeliveryFee(value: string) {
    this._orderTotalOfDeliveryFee = StringToNumberHelper(value);
  }

  @Input() set orderTotalOfDeposit(value: string) {
    this._orderTotalOfDeposit = StringToNumberHelper(value);
  }

  @Input() set orderTotalOfRefund(value: string) {
    this._orderTotalOfRefund = StringToNumberHelper(value);
  }

  @Input() set orderPaidAmount(value: string) {
    this._orderPaidAmount = StringToNumberHelper(value);
  }

  datasets!: ChartDataset<'doughnut', number[]>[];
  labels: string[] = ['Total for Products', 'Total for Delivery fee', 'Total for Deposit', 'Total for Refund'];
  formatterSymbol: string = '%';
  refresh: symbol | null = null;

  private backgroundColor: string[] = ['rgba(44,200,77,0.7)', 'rgb(0,0,255, 0.7)', 'rgb(255,255,0, 0.7)', 'rgb(255,0,0, 0.7)'];

  private defaultDataset: ChartDataset<'doughnut', number[]> = {
    backgroundColor: this.backgroundColor,
    hoverBackgroundColor: this.backgroundColor,
    data: [],
    hoverOffset: 4,
    datalabels: {
      display: true,
    },
    borderWidth: 0.5,
    hoverBorderWidth: 1,
  };

  private percentageDataset!: ChartDataset<'doughnut', number[]>[];
  private absoluteDataset!: ChartDataset<'doughnut', number[]>[];

  ngOnInit(): void {
    this.calculateData();
    this.setData(this.viewModeController.value);
    this.viewModeChangesSubscription();
  }

  private calculateData(): void {
    const percentageDataset: ChartDataset<'doughnut', number[]>[] = [];
    const absoluteDataset: ChartDataset<'doughnut', number[]>[] = [];

    const deposit: number = this._orderTotalOfDeposit;
    const products: number = this._orderSubTotal - deposit;
    const deliveryPrice: number = this._orderTotalOfDeliveryFee;
    const totalRefund: number = this._orderTotalOfRefund;
    const totalPricing: number = this._orderPaidAmount || products + deliveryPrice + deposit + totalRefund;

    const totalOrderData: number[] = [products, deliveryPrice, deposit, totalRefund];

    percentageDataset.push({
      ...this.defaultDataset,
      data: this.getPercentage(totalOrderData, totalPricing),
      label: 'Order total',
      weight: 0.5,
    });

    absoluteDataset.push({
      ...this.defaultDataset,
      data: [products, deliveryPrice, deposit, totalRefund],
      label: 'Order total',
      weight: 0.5,
    });

    for (const transaction of this.transactions) {
      const subtotal: number = StringToNumberHelper(transaction.totalAmount);
      const deposit: number = StringToNumberHelper(transaction.totalDeposit);
      const deliveryPrice: number = transaction.deliveryFee?.isRefunded ? 0 : StringToNumberHelper(transaction.deliveryFee?.value);
      const totalRefund: number = StringToNumberHelper(transaction.totalRefund);
      const products: number = subtotal - deposit;
      const totalPricing: number = StringToNumberHelper(transaction.paidAmount) || products + deposit + deliveryPrice + totalRefund;

      const absoluteData: number[] = [products, deliveryPrice, deposit, totalRefund];

      percentageDataset.push({
        ...this.defaultDataset,
        data: this.getPercentage(absoluteData, totalPricing),
        label: `Transaction: ${transaction.orderTransactionNumber}`,
      });

      absoluteDataset.push({
        ...this.defaultDataset,
        data: [...absoluteData],
        label: `Transaction: ${transaction.orderTransactionNumber}`,
      });
    }

    this.percentageDataset = [...percentageDataset];
    this.absoluteDataset = [...absoluteDataset];
  }

  setData(isPercentage: boolean): void {
    this.datasets = isPercentage ? [...this.percentageDataset] : [...this.absoluteDataset];
    this.formatterSymbol = isPercentage ? '%' : this._currency;
  }

  getPercentage(items: number[], maxValue: number): number[] {
    return items.map((value: number) => (value * 100) / maxValue);
  }

  viewModeChangesSubscription(): void {
    this.viewModeController.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        tap((isPercentage: boolean) => {
          this.setData(isPercentage);
          this.onRefreshChart();
        }),
      )
      .subscribe();
  }

  onRefreshChart(): void {
    this.refresh = Symbol('refresh');
  }
}
