import { NgModule } from '@angular/core';
import { DynamicIoModule } from 'ng-dynamic-component';

import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreSchedulerComponent } from './components/store-scheduler/store-scheduler.component';
import { StoreSchedulerRouterModule } from './store-scheduler-router.module';

@NgModule({
  declarations: [StoreSchedulerComponent],
  imports: [SharedModule, StoreSchedulerRouterModule, DynamicIoModule],
})
export class StoreSchedulerModule {}
