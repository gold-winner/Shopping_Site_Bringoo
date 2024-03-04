import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductPriceRequestCrudComponent } from './components/product-price-request-crud/product-price-request-crud.component';

const routes: Routes = [
  {
    path: '',
    component: ProductPriceRequestCrudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPriceRequestRouterModule {}
