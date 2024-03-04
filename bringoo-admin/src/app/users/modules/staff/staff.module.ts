import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { PushNotificationModule } from '../../../push-notification/push-notification.module';
import { SmsHistoryModule } from '../../../sms-history/sms-history.module';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { CrudStaffComponent } from './components/crud-staff/crud-staff.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { StaffDetailComponent } from './components/staff-detail/staff-detail.component';
import { StaffInfoComponent } from './components/staff-detail/staff-info/staff-info.component';
import { StaffNoteComponent } from './components/staff-detail/staff-note/staff-note.component';
import { StaffOrderHistoryComponent } from './components/staff-detail/staff-order-history/staff-order-history.component';
import { StaffOrderHistoryFilterComponent } from './components/staff-detail/staff-order-history/staff-order-history-filter/staff-order-history-filter.component';
import { StaffOverviewComponent } from './components/staff-detail/staff-overview/staff-overview.component';
import { StaffSessionHistoryComponent } from './components/staff-detail/staff-session-history/staff-session-history.component';
import { StaffSessionHistoryFilterComponent } from './components/staff-detail/staff-session-history/staff-session-history-filter/staff-session-history-filter.component';
import { StaffStoreBoundCreateFormComponent } from './components/staff-detail/staff-store-bound/staff-store-bound-create-form/staff-store-bound-create-form.component';
import { StaffStoreBoundCrudComponent } from './components/staff-detail/staff-store-bound/staff-store-bound-crud/staff-store-bound-crud.component';
import { StaffStoreBoundFilterComponent } from './components/staff-detail/staff-store-bound/staff-store-bound-filter/staff-store-bound-filter.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { StaffRouterModule } from './staff-router.module';

@NgModule({
  declarations: [
    CrudStaffComponent,
    CreateFormComponent,
    FilterFormComponent,
    UpdateFormComponent,
    StaffDetailComponent,
    StaffOverviewComponent,
    StaffInfoComponent,
    StaffNoteComponent,
    StaffOrderHistoryComponent,
    StaffOrderHistoryFilterComponent,
    StaffSessionHistoryComponent,
    StaffSessionHistoryFilterComponent,
    StaffStoreBoundCrudComponent,
    StaffStoreBoundFilterComponent,
    StaffStoreBoundCreateFormComponent,
  ],
  imports: [SharedModule, StaffRouterModule, CrudModule, PushNotificationModule, SmsHistoryModule],
})
export class StaffModule {}
