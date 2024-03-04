import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { NotificationSmsListComponent } from './components/notification-sms-list/notification-sms-list.component';
import { NotificationSmsRouterModule } from './notification-sms-router.module';

@NgModule({
  declarations: [NotificationSmsListComponent],
  imports: [SharedModule, NotificationSmsRouterModule],
})
export class NotificationSmsModule {}
