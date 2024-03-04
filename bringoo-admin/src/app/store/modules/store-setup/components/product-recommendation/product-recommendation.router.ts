import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductRecommendationCrudComponent } from './components/product-recommendation-crud/product-recommendation-crud.component';
import { ProductRecommendationDetailsComponent } from './components/product-recommendation-details/product-recommendation-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductRecommendationCrudComponent,
  },
  {
    path: 'details',
    pathMatch: 'full',
    data: { breadcrumb: 'Details' },
    component: ProductRecommendationDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRecommendationRouter {}
