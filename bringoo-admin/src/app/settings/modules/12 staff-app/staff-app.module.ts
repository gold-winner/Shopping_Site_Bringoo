import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { StaffAppRouterModule } from './staff-app-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, StaffAppRouterModule],
})
export class StaffAppModule {}
