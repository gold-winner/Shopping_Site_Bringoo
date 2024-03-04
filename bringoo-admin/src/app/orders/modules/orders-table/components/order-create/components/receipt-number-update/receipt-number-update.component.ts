import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { OrderReceiptNumberInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { OrderUpdateService } from '../../../../../../../../shared/api/auth/order-update.service';
import { validateForm } from '../../../../../../../../shared/helpers/validate-form';
import { ToFormGroupType } from '../../../../../../../../shared/types/to-form-group.type';

@Component({
  selector: 'app-receipt-number-update',
  templateUrl: 'receipt-number-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceiptNumberUpdateComponent {
  form = new FormGroup<ToFormGroupType<OrderReceiptNumberInput>>({
    receiptNumber: new FormControl(null, [Validators.required, Validators.min(0)]),
  });

  @Input() openPanel: boolean = false;
  @Input() orderId!: string;
  @Input() set receiptNumber(receiptNumber: string | undefined) {
    if (receiptNumber) {
      this.form.setValue({ receiptNumber });
    }
  }

  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private readonly service: OrderUpdateService, private readonly notification: NzNotificationService) {}

  onCloseDrawer(): void {
    this.submit.emit(false);
  }

  onSubmit(): void {
    validateForm(this.form);

    if (this.form.valid && this.form.value.receiptNumber) {
      const { receiptNumber } = this.form.value;

      this.service.updateReceiptNumber(this.orderId, { receiptNumber }).subscribe(
        () => {
          this.notification.success('Receipt Number', 'Successfully updated.');
          this.submit.emit(true);
        },
        () => this.submit.emit(false),
      );
    }
  }
}
