import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { NotificationAllCrudComponent } from './components/notification-all-crud/notification-all-crud.component';
import { NotificationMyUnreadCrudComponent } from './components/notification-my-unread-crud/notification-my-unread-crud.component';

const routes: Routes = [
  { path: 'my-unread', component: NotificationMyUnreadCrudComponent },
  { path: '', component: NotificationAllCrudComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationAllRouterModule {}
