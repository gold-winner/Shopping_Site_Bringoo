import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { VendorManagementRouterModule } from './vendor-management-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, VendorManagementRouterModule],
})
export class VendorManagementModule {}
