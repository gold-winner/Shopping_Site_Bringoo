import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { PartnerAppRouterModule } from './partner-app-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, PartnerAppRouterModule],
})
export class PartnerAppModule {}
