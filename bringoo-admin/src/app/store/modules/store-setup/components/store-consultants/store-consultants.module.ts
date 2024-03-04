import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { components } from './components';
import { StoreConsultantsRouterModule } from './store-consultants-router.module';

@NgModule({
  declarations: [...components],
  imports: [CrudModule, SharedModule, StoreConsultantsRouterModule],
})
export class StoreConsultantsModule {}
