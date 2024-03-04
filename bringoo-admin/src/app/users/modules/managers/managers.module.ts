import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { PushNotificationModule } from '../../../push-notification/push-notification.module';
import { ManagersCreateFormComponent } from './components/managers-create-form/managers-create-form.component';
import { ManagersCrudComponent } from './components/managers-crud-staff/managers-crud.component';
import { ManagersDetailComponent } from './components/managers-detail/managers-detail.component';
import { ManagersInfoComponent } from './components/managers-detail/managers-info/managers-info.component';
import { ManagersNoteComponent } from './components/managers-detail/managers-note/managers-note.component';
import { ManagersOverviewComponent } from './components/managers-detail/managers-overview/managers-overview.component';
import { ManagersSessionHistoryComponent } from './components/managers-detail/managers-session-history/managers-session-history.component';
import { ManagersSessionHistoryFilterComponent } from './components/managers-detail/managers-session-history/managers-session-history-filter/managers-session-history-filter.component';
import { ManagersFilterFormComponent } from './components/managers-filter-form/managers-filter-form.component';
import { ManagersUpdateFormComponent } from './components/managers-update-form/managers-update-form.component';
import { ManagersRouterModule } from './managers-router.module';

@NgModule({
  declarations: [
    ManagersCrudComponent,
    ManagersCreateFormComponent,
    ManagersFilterFormComponent,
    ManagersUpdateFormComponent,
    ManagersDetailComponent,
    ManagersOverviewComponent,
    ManagersInfoComponent,
    ManagersNoteComponent,
    ManagersSessionHistoryComponent,
    ManagersSessionHistoryFilterComponent,
  ],
  imports: [SharedModule, ManagersRouterModule, CrudModule, PushNotificationModule],
})
export class ManagersModule {}
