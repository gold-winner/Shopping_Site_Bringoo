import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { FinancialManagementRouterModule } from './financial-management-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, FinancialManagementRouterModule],
})
export class FinancialManagementModule {}
