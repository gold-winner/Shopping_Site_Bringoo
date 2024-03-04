import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { NotificationAllCrudComponent } from './components/notification-all-crud/notification-all-crud.component';
import { NotificationAllFilterFormComponent } from './components/notification-all-filter-form/notification-all-filter-form.component';
import { NotificationMyUnreadCrudComponent } from './components/notification-my-unread-crud/notification-my-unread-crud.component';
import { NotificationMyUnreadFilterFormComponent } from './components/notification-my-unread-filter-form/notification-my-unread-filter-form.component';
import { NotificationAllRouterModule } from './notification-all-router.module';

@NgModule({
  declarations: [
    NotificationAllCrudComponent,
    NotificationAllFilterFormComponent,
    NotificationMyUnreadCrudComponent,
    NotificationMyUnreadFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, NotificationAllRouterModule],
})
export class NotificationAllModule {}
