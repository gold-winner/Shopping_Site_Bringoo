import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductPricingComponent } from './components/product-pricing/product-pricing.component';
import { ProductPricingFilterFormComponent } from './components/product-pricing-filter-form/product-pricing-filter-form.component';
import { ProductPricingRouterModule } from './product-pricing-router.module';

@NgModule({
  declarations: [ProductPricingFilterFormComponent, ProductPricingComponent],
  imports: [SharedModule, CrudModule, ProductPricingRouterModule],
})
export class ProductPricingModule {}
