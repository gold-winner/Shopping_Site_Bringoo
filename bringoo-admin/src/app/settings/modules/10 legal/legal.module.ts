import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { LegalRouterModule } from './legal-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, LegalRouterModule],
})
export class LegalModule {}
