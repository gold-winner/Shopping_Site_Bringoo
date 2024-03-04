import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { ProductManagementRouterModule } from './product-management-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, ProductManagementRouterModule],
})
export class ProductManagementModule {}
