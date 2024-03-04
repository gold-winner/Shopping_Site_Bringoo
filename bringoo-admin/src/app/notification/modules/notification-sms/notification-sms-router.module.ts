import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { NotificationSmsListComponent } from './components/notification-sms-list/notification-sms-list.component';

const routes: Routes = [
  { path: '', component: NotificationSmsListComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationSmsRouterModule {}
