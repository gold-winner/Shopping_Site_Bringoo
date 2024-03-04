import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { StoresModule } from '../stores/stores.module';
import { ProductPricingComponent } from './components/product-pricing/product-pricing.component';

const routes: Routes = [
  {
    path: ':id',
    data: { breadcrumb: '' },
    component: ProductPricingComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    data: { breadcrumb: '' },
    loadChildren: (): Promise<Type<StoresModule>> =>
      import('./../stores/stores.module').then((m: { StoresModule: Type<StoresModule> }) => m.StoresModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPricingRouterModule {}
