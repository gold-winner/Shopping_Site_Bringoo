import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommunicationAndEmailComponent } from './components/communication-and-email/communication-and-email.component';
import { NotificationManagementModule } from './modules/notification-management/notification-management.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CommunicationAndEmailComponent,
  },
  {
    path: 'notification-management',
    data: {
      breadcrumb: 'Vendor Type Setup',
    },
    loadChildren: (): Promise<Type<NotificationManagementModule>> =>
      import('./modules/notification-management/notification-management.module').then(
        (m: { NotificationManagementModule: Type<NotificationManagementModule> }) => m.NotificationManagementModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationAndEmailRouterModule {}
