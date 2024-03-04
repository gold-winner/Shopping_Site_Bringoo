import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { CustomerAppRouterModule } from './customer-app-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, CustomerAppRouterModule],
})
export class CustomerAppModule {}
