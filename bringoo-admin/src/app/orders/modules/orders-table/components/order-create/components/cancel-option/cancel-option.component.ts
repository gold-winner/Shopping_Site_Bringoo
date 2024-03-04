import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CrudOrderService } from '../../../../../../../../shared/api/auth/crud-order.service';

@UntilDestroy()
@Component({
  selector: 'app-cancel-option',
  templateUrl: './cancel-option.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelOptionComponent implements OnInit {
  @Input() label: string = '';
  @Input() openPanel: boolean = false;
  @Input() orderId: string = '';
  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() placeHolder: string = '';

  form!: UntypedFormGroup;

  constructor(
    public readonly service: CrudOrderService,
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      refundOrder: [false],
      cancelDescription: [null],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.service
        .deleteOrder(this.route.snapshot.params['id'], this.form.value)
        .pipe(untilDestroyed(this))
        .subscribe(
          () => {
            this.submit.emit(true);
            this.notification.success('Cancel order', 'Successfully updated order status.');
          },
          (err: HttpErrorResponse) => this.notification.error('Cancel order', err.message),
        );
      this.submit.emit(true);
    }
  }

  onCloseDrawer(): void {
    this.submit.emit(false);
  }
}
