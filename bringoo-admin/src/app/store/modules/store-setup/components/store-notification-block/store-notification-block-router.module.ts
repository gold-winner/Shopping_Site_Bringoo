import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreNotificationBlocksComponent } from './components/store-notification-block.component';

const routes: Routes = [{ path: '', component: StoreNotificationBlocksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreNotificationBlockRouterModule {}
