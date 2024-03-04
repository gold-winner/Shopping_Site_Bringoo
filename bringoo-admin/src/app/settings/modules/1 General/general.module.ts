import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { GeneralRouterModule } from './general-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, GeneralRouterModule],
})
export class GeneralModule {}
