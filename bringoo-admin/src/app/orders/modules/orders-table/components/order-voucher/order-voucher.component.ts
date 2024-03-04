import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AppManagerOrderVoucherService } from '../../../../../../shared/api/auth/app-manager-order-voucher.service';
import { OrderVoucherDto } from '../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-order-voucher',
  templateUrl: './order-voucher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderVoucherComponent implements OnInit {
  @Input() orderId!: string;

  orderVoucher$: BehaviorSubject<OrderVoucherDto | null> = new BehaviorSubject<OrderVoucherDto | null>(null);

  constructor(private readonly appManagerOrderVoucherService: AppManagerOrderVoucherService) {}

  ngOnInit(): void {
    this.getVoucher();
  }

  getVoucher(): void {
    this.appManagerOrderVoucherService.getOrderVoucherByOrderId(this.orderId).subscribe((orderVoucher: OrderVoucherDto) => {
      this.orderVoucher$.next(orderVoucher);
    });
  }
}
