import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AppManagerCommissionFeeService } from '../../../../../../shared/api/auth/app-manager-commission-fee.service';
import { CommissionFeeOrderEntity } from '../../../../../../shared/api/auth/data-contracts';
import { AppLanguageService } from '../../../../../../shared/services/app-language.service';

@Component({
  selector: 'app-order-commission-fee',
  templateUrl: './order-commission-fee.component.html',
  styleUrls: ['order-commission-fee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCommissionFeeComponent implements OnInit {
  @Input() orderId: string = '';
  orderCommissionFee$: BehaviorSubject<CommissionFeeOrderEntity | null> = new BehaviorSubject<CommissionFeeOrderEntity | null>(null);
  isLoading$: Observable<boolean> = this.appManagerCommissionFeeService.isLoading$;

  constructor(
    private readonly appManagerCommissionFeeService: AppManagerCommissionFeeService,
    public readonly appLanguageService: AppLanguageService,
  ) {}

  ngOnInit(): void {
    this.loadOrderCommissionFee();
  }

  recalculateCommissionFee(): void {
    this.appManagerCommissionFeeService
      .createCommissionFeeForOrder({ orderId: this.orderId })
      .subscribe((commissionFeeForOrder: CommissionFeeOrderEntity) => {
        this.orderCommissionFee$.next(commissionFeeForOrder);
      });
  }

  loadOrderCommissionFee(): void {
    this.appManagerCommissionFeeService
      .getCommissionFeeForOrder(this.orderId)
      .subscribe((commissionFeeForOrder: CommissionFeeOrderEntity) => {
        this.orderCommissionFee$.next(commissionFeeForOrder);
      });
  }
}
