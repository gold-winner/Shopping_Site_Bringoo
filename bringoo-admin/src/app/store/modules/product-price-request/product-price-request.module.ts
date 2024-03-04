import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { ProductPriceRequestRouterModule } from './product-price-request-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, CrudModule, ProductPriceRequestRouterModule],
})
export class ProductPriceRequestModule {}
