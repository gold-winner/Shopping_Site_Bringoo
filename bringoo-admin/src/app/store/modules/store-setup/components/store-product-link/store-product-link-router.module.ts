import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductPricingModule } from './components/product-pricing/product-pricing.module';
import { StoreProductLinkCrudComponent } from './components/store-product-link-crud/store-product-link-crud.component';

const routes: Routes = [
  { path: '', component: StoreProductLinkCrudComponent, pathMatch: 'full' },
  {
    path: ':id',
    data: { storeSetup: true },
    loadChildren: (): Promise<Type<ProductPricingModule>> =>
      import('./components/product-pricing/product-pricing.module').then(
        (m: { ProductPricingModule: Type<ProductPricingModule> }) => m.ProductPricingModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreProductLinkRouterModule {}
