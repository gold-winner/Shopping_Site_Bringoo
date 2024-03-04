import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductPricingCrudComponent } from './components/product-pricing-crud/product-pricing-crud.component';

const routes: Routes = [{ path: '', component: ProductPricingCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPricingRouterModule {}
