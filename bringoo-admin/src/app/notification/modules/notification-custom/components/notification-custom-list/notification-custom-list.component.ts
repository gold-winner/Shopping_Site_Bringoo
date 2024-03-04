import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { AppManagerPushNotificationCustomService } from '../../../../../../shared/api/auth/app-manager-push-notification-custom.service';
import { PushNotificationCustomCreateInput } from '../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-notification-custom-list',
  templateUrl: './notification-custom-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-flex flex-column h-100p' },
})
export class NotificationCustomListComponent {
  customerFormVisible = false;
  staffFormVisible = false;
  reloadPage: symbol | undefined = Symbol('init');

  constructor(
    private appManagerPushNotificationService: AppManagerPushNotificationCustomService,
    private readonly nzNotification: NzNotificationService,
    private changeDetection: ChangeDetectorRef,
  ) {}

  onShowCustomerForm(): void {
    this.customerFormVisible = true;
    this.staffFormVisible = false;
  }

  onCloseCustomerDrawer(): void {
    this.customerFormVisible = false;
  }

  onShowStaffForm(): void {
    this.customerFormVisible = false;
    this.staffFormVisible = true;
  }

  onCloseStaffDrawer(): void {
    this.staffFormVisible = false;
  }

  onCustomerNotification(input: PushNotificationCustomCreateInput): void {
    this.onCloseCustomerDrawer();

    this.appManagerPushNotificationService.createPushNotificationCustom(input).subscribe(() => {
      this.reloadPage = Symbol('reload');
      this.changeDetection.detectChanges();
      this.nzNotification.success('Custom notification', `The notification put to the queue for customers`);
    });
  }

  onStaffNotification(input: PushNotificationCustomCreateInput): void {
    this.onCloseStaffDrawer();
    this.appManagerPushNotificationService.createPushNotificationCustom(input).subscribe(() => {
      this.reloadPage = Symbol('reload');
      this.changeDetection.detectChanges();
      this.nzNotification.success('Custom notification', `The notification put to the queue for  staff`);
    });
  }
}
