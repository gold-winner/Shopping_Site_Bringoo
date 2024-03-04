import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { OrderTagsService } from '../../../../../../../../shared/api/auth/order-tags.service';

@Component({
  selector: 'app-tags-update',
  templateUrl: 'tags-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsUpdateComponent {
  form: UntypedFormGroup = this.fb.group({
    tags: [[]],
  });

  @Input() openPanel: boolean = false;
  @Input() orderId!: string;
  @Input() set tags(tags: string[] | undefined) {
    if (tags) {
      this.form.setValue({ tags });
    }
  }

  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private readonly service: OrderTagsService,
    private readonly fb: UntypedFormBuilder,
    private readonly notification: NzNotificationService,
  ) {}

  onCloseDrawer(): void {
    this.submit.emit(false);
  }

  onSubmit(): void {
    this.service.changeOrderTags({ orderId: this.orderId, tags: this.form.value.tags }).subscribe(
      () => {
        this.notification.success('Order Tags', 'Successfully updated.');
        this.submit.emit(true);
      },
      () => this.submit.emit(false),
    );
  }
}
