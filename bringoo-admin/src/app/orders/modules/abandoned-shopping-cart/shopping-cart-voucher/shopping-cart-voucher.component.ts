import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';

import { AppManagerCartVoucherService } from '../../../../../shared/api/auth/app-manager-cart-voucher.service';
import { CartVoucherDto, VoucherApplyTryDto } from '../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-shopping-cart-voucher',
  templateUrl: './shopping-cart-voucher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartVoucherComponent implements OnInit {
  @Input() cartId!: string;

  cartVoucher$: BehaviorSubject<CartVoucherDto | null> = new BehaviorSubject<CartVoucherDto | null>(null);

  constructor(
    private readonly appManagerCartVoucherService: AppManagerCartVoucherService,
    private readonly notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.getVoucher();
  }

  getVoucher(): void {
    this.appManagerCartVoucherService.getVoucherByCartId(this.cartId).subscribe((cartVoucher: CartVoucherDto) => {
      this.cartVoucher$.next(cartVoucher);
    });
  }

  deleteVoucher(): void {
    this.appManagerCartVoucherService.deleteVoucherByCartId(this.cartId).subscribe((response: boolean) => {
      if (response) {
        this.cartVoucher$.next(null);
      }
    });
  }

  applyVoucher(voucherCode: string): void {
    this.appManagerCartVoucherService
      .applyVoucherToCart({ voucherCode, cartId: this.cartId })
      .subscribe(({ isApplied, messages }: VoucherApplyTryDto) => {
        if (isApplied) {
          this.notification.success('Applied', '');
          this.getVoucher();
        } else {
          for (const message of messages) {
            this.notification.error('Error', message);
          }
        }
      });
  }
}
