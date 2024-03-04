import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { NotificationCustomCrudComponent } from './components/notification-custom-crud/notification-custom-crud.component';
import { NotificationCustomCustomerFormComponent } from './components/notification-custom-customer-form/notification-custom-customer-form.component';
import { NotificationCustomFilterFormComponent } from './components/notification-custom-filter-form/notification-custom-filter-form.component';
import { NotificationCustomListComponent } from './components/notification-custom-list/notification-custom-list.component';
import { NotificationCustomStaffFormComponent } from './components/notification-custom-staff-form/notification-custom-staff-form.component';
import { NotificationCustomRouterModule } from './notification-custom-router.module';

@NgModule({
  declarations: [
    NotificationCustomListComponent,
    NotificationCustomCustomerFormComponent,
    NotificationCustomStaffFormComponent,
    NotificationCustomCrudComponent,
    NotificationCustomFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, NotificationCustomRouterModule],
})
export class NotificationCustomModule {}
