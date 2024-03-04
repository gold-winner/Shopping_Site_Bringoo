import { ChangeDetectorRef, Component } from '@angular/core';
import { AppNotificationSettings } from 'src/shared/api/app-notification-settings';
import { NotificationSettingsDto, NotificationSettingsInput } from 'src/shared/api/data-contracts';
@Component({
  selector: 'ui-settings-notification',
  templateUrl: './settings-notification.component.html',
  styleUrls: ['./settings-notification.component.scss'],
})
export class SettingsNotificationComponent {
  enabled: boolean = true;
  notification: NotificationSettingsDto | undefined;

  constructor(public readonly appNotificationSettings: AppNotificationSettings, private ref: ChangeDetectorRef) {
    this.appNotificationSettings.getNotificationSettings().subscribe(
      (res: NotificationSettingsDto) => {
        this.notification = res;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onChangeNotification(): void {
    const data: NotificationSettingsInput = {
      newProductArrivals: this.notification?.newProductArrivals ? true : false,
      sales: this.notification?.sales ? true : false,
      deliveryStatusChange: this.notification?.deliveryStatusChange ? false : true,
    };
    this.appNotificationSettings.updateNotificationSettings(data).subscribe(
      (res: NotificationSettingsDto) => {
        this.notification = res;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }
}
