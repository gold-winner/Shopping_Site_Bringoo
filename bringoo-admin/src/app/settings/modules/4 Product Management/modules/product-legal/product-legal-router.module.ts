import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductLegalCrudComponent } from './components/product-legal-crud/product-legal-crud.component';

const routes: Routes = [{ path: '', component: ProductLegalCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductLegalRouterModule {}
