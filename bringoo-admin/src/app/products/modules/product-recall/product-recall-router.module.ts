import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { ProductRecallCrudComponent } from './components/product-recall-crud/product-recall-crud.component';
import { ProductRecallDetailsComponent } from './components/product-recall-details/product-recall-details.component';

const routes: Routes = [
  { path: '', component: ProductRecallCrudComponent },
  { path: ':id', component: ProductRecallDetailsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRecallRouterModule {}
