import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../../../shared/shared.module';
import { ProductPricingCreateFormComponent } from './components/product-pricing-create-form/product-pricing-create-form.component';
import { ProductPricingCrudComponent } from './components/product-pricing-crud/product-pricing-crud.component';
import { ProductPricingFilterFormComponent } from './components/product-pricing-filter-form/product-pricing-filter-form.component';
import { ProductPricingUpdateFormComponent } from './components/product-pricing-update-form/product-pricing-update-form.component';
import { ProductPricingRouterModule } from './product-pricing-router.module';

@NgModule({
  declarations: [
    ProductPricingCrudComponent,
    ProductPricingCreateFormComponent,
    ProductPricingFilterFormComponent,
    ProductPricingUpdateFormComponent,
  ],
  imports: [SharedModule, CrudModule, ProductPricingRouterModule],
})
export class ProductPricingModule {}
