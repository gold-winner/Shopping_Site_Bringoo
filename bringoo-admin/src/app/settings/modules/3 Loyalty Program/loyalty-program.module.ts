import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { LoyaltyProgramRouterModule } from './loyalty-program-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, LoyaltyProgramRouterModule],
})
export class LoyaltyProgramModule {}
