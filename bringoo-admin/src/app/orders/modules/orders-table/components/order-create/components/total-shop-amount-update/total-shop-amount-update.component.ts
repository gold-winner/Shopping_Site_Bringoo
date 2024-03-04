import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { OrderUpdateService } from '../../../../../../../../shared/api/auth/order-update.service';

@Component({
  selector: 'app-total-shop-amount-update',
  templateUrl: 'total-shop-amount-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalShopAmountUpdateComponent {
  form: UntypedFormGroup = this.fb.group({
    totalShopAmount: [null, [Validators.required, Validators.min(0)]],
  });

  @Input() openPanel: boolean = false;
  @Input() orderId!: string;
  @Input() set totalShopAmount(totalShopAmount: number | undefined) {
    if (totalShopAmount) {
      this.form.setValue({ totalShopAmount });
    }
  }

  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private readonly service: OrderUpdateService,
    private readonly fb: UntypedFormBuilder,
    private readonly notification: NzNotificationService,
  ) {}

  onCloseDrawer(): void {
    this.submit.emit(false);
  }

  onSubmit(): void {
    this.service.managerUpdateOrderValues(this.orderId, this.form.value).subscribe(
      () => {
        this.notification.success('Store Receipt Amount', 'Successfully updated.');
        this.submit.emit(true);
      },
      () => this.submit.emit(false),
    );
  }
}
