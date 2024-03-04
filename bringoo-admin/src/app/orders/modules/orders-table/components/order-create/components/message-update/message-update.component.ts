import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { OrderUpdateService } from '../../../../../../../../shared/api/auth/order-update.service';

@UntilDestroy()
@Component({
  selector: 'app-message-update',
  templateUrl: './message-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageUpdateComponent implements OnInit {
  @Input() label: string = '';
  @Input() openPanel: boolean = false;
  @Input() orderId: string = '';
  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() placeHolder: string = '';
  @Input() message: string = '';

  @Input() messageFor: 'messageForShopper' | 'deliveryComment' = 'messageForShopper';

  form!: UntypedFormGroup;

  constructor(
    public readonly service: OrderUpdateService,
    private readonly fb: UntypedFormBuilder,
    private readonly notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({});
    this.form.addControl(this.messageFor, this.fb.control(this.message));
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.messageFor === 'messageForShopper') {
        this.service.messageForShopperUpdate(this.orderId, { message: this.form.get(this.messageFor)?.value }).subscribe(
          () => {
            this.submit.emit(true);
            this.notification.success('Update message For Shopper', 'Successfully updated.');
          },
          (err: HttpErrorResponse) => this.notification.error('Update message For Shopper', err.message),
        );
      } else {
        this.service.deliveryCommentUpdate(this.orderId, { message: this.form.get(this.messageFor)?.value }).subscribe(
          () => {
            this.submit.emit(true);
            this.notification.success('Update delivery comment', 'Successfully updated.');
          },
          (err: HttpErrorResponse) => this.notification.error('Update delivery comment', err.message),
        );
      }
    }
  }

  onCloseDrawer(): void {
    this.submit.emit(false);
  }
}
