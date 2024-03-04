import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { RestrictionsRouterModule } from './restrictions-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, RestrictionsRouterModule],
})
export class RestrictionsModule {}
