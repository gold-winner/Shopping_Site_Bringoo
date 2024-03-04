import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductPromotionCrudComponent } from './components/product-promotion-crud/product-promotion-crud.component';
import { ProductPromotionDetailsComponent } from './components/product-promotion-details/product-promotion-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductPromotionCrudComponent,
  },
  {
    path: 'details',
    pathMatch: 'full',
    data: { breadcrumb: 'Details' },
    component: ProductPromotionDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPromotionRouter {}
