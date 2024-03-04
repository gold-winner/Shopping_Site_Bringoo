import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { CommunicationAndEmailRouterModule } from './communication-and-email-router.module';
import { components } from './components';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, CommunicationAndEmailRouterModule],
})
export class CommunicationAndEmailModule {}
