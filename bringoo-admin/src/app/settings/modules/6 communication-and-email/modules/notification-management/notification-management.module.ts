import { NgModule } from '@angular/core';
import { NgxBarcode6Module } from 'ngx-barcode6';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { NotificationManagmentCreateFormComponent } from './components/notification-management-create-form/notification-management-create-form.component';
import { NotificationManagementCrudComponent } from './components/notification-management-crud/notification-management-crud.component';
import { NotificationManagementFilterFormComponent } from './components/notification-management-filter-form/notification-management-filter-form.component';
import { NotificationManagementUpdateFormComponent } from './components/notification-management-update-form/notification-management-update-form.component';
import { NotificationManagmentRouterModule } from './notification-management-router.module';

@NgModule({
  declarations: [
    NotificationManagementCrudComponent,
    NotificationManagmentCreateFormComponent,
    NotificationManagementUpdateFormComponent,
    NotificationManagementFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, NotificationManagmentRouterModule, NgxBarcode6Module],
  exports: [NotificationManagementUpdateFormComponent],
})
export class NotificationManagementModule {}
