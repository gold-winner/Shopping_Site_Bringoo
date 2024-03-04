import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotificationCustomListComponent } from './components/notification-custom-list/notification-custom-list.component';

const routes: Routes = [{ path: '', component: NotificationCustomListComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationCustomRouterModule {}
