import { NgModule } from '@angular/core';

import { CrudModule } from '../../shared/modules/crud/crud.module';
import { SharedModule } from '../../shared/shared.module';
import { NotificationRoutingModule } from './notification-routing.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, CrudModule, NotificationRoutingModule],
})
export class NotificationModule {}
