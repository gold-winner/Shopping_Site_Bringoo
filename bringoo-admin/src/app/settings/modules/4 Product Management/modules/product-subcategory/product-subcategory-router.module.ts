import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../../../layout/components/page-not-found/page-not-found.component';
import { ProductSubcategoryCrudComponent } from './components/product-subcategory-crud/product-subcategory-crud.component';

const routes: Routes = [
  { path: '', component: ProductSubcategoryCrudComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductSubcategoryRouterModule {}
