import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/helpers/auth.guard';
import { PageNotFoundComponent } from '../layout/components/page-not-found/page-not-found.component';
import { NotificationAllModule } from './modules/notification-all/notification-all.module';
import { NotificationCustomModule } from './modules/notification-custom/notification-custom.module';
import { NotificationSmsModule } from './modules/notification-sms/notification-sms.module';

const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  {
    path: 'custom-schedule',
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Custom Notifications Schedules' },
    loadChildren: (): Promise<Type<NotificationCustomModule>> =>
      import('./modules/notification-custom/notification-custom.module').then(
        (m: { NotificationCustomModule: Type<NotificationCustomModule> }) => m.NotificationCustomModule,
      ),
  },
  {
    path: 'all',
    canActivate: [AuthGuard],
    data: { breadcrumb: 'All Notifications' },
    loadChildren: (): Promise<Type<NotificationAllModule>> =>
      import('./modules/notification-all/notification-all.module').then(
        (m: { NotificationAllModule: Type<NotificationAllModule> }) => m.NotificationAllModule,
      ),
  },
  {
    path: 'sms',
    canActivate: [AuthGuard],
    data: { breadcrumb: 'All SMS Notifications' },
    loadChildren: (): Promise<Type<NotificationSmsModule>> =>
      import('./modules/notification-sms/notification-sms.module').then(
        (m: { NotificationSmsModule: Type<NotificationSmsModule> }) => m.NotificationSmsModule,
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
