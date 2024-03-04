import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { ProductPricingModule } from '../store-setup/components/store-product-link/components/product-pricing/product-pricing.module';
import { StoreProductLinkCrudComponent } from './components/store-product-link-crud/store-product-link-crud.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: StoreProductLinkCrudComponent,
  },
  {
    path: ':id',
    data: { breadcrumb: 'Product Link', storeSetup: false },
    loadChildren: (): Promise<Type<ProductPricingModule>> =>
      import('../store-setup/components/store-product-link/components/product-pricing/product-pricing.module').then(
        (m: { ProductPricingModule: Type<ProductPricingModule> }) => m.ProductPricingModule,
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductLinkRouterModule {}
