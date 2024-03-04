import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { ProductRequestCrudComponent } from './components/product-request-crud/product-request-crud.component';
import { ProdutRequestDetailComponent } from './components/product-request-detail/product-request-detail.component';

const routes: Routes = [
  { path: '', component: ProductRequestCrudComponent },
  { path: 'details/:id', component: ProdutRequestDetailComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRequestRouterModule {}
