import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreServiceSubComponent } from './components/store-service-sub.component';
import { StoreServiceSubRouterModule } from './store-service-sub-router.module';

@NgModule({
  declarations: [StoreServiceSubComponent],
  imports: [SharedModule, CrudModule, StoreServiceSubRouterModule],
})
export class StoreServiceSubModule {}
