import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreNotificationBlocksComponent } from './components/store-notification-block.component';
import { StoreNotificationBlockRouterModule } from './store-notification-block-router.module';

@NgModule({
  declarations: [StoreNotificationBlocksComponent],
  imports: [SharedModule, CrudModule, StoreNotificationBlockRouterModule],
})
export class StoreNotificationBlockModule {}
