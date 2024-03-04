import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { FaqRouterModule } from './faq-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, FaqRouterModule],
})
export class FaqModule {}
