import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { OrderUpdateService } from '../../../../../../../../shared/api/auth/order-update.service';
import { ArrayMinLengthValidator } from '../../../../../../../../shared/form validators/array-min-length.validator';
import { validateForm } from '../../../../../../../../shared/helpers/validate-form';

@UntilDestroy()
@Component({
  selector: 'app-load-receipt',
  templateUrl: './load-receipt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadReceiptComponent {
  @Input() openPanel: boolean = false;
  @Input() orderId: string = '';
  @Input() receiptType: 'VAT_RECEIPT' | 'RECEIPT' = 'RECEIPT';
  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() set images(images: string[]) {
    this.form.patchValue({ imageUrls: images });
  }

  form!: UntypedFormGroup;

  constructor(
    public readonly service: OrderUpdateService,
    private readonly fb: UntypedFormBuilder,
    private readonly notification: NzNotificationService,
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      imageUrls: [[], [ArrayMinLengthValidator(1)]],
    });
  }

  onSubmit(): void {
    validateForm(this.form);
    if (this.form.valid) {
      this.service[this.receiptType === 'RECEIPT' ? 'updateReceipts' : 'updateVATReceipts'](this.orderId, {
        imageUrls: this.form.value.imageUrls,
      }).subscribe(
        () => {
          this.notification.success('Order receipt', 'Successfully loaded.');
          this.submit.emit(true);
        },
        () => this.submit.emit(false),
      );
    }
  }

  onCloseDrawer(): void {
    this.submit.emit(false);
  }
}
