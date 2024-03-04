import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { components } from './components';
import { ProductLegalRouterModule } from './product-legal-router.module';

@NgModule({
  declarations: [...components],
  imports: [CrudModule, SharedModule, ProductLegalRouterModule],
})
export class ProductLegalModule {}
