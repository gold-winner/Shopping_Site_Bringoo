import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../../../layout/components/page-not-found/page-not-found.component';
import { ProductUnitCrudComponent } from './components/product-unit-crud/product-unit-crud.component';

const routes: Routes = [
  { path: '', component: ProductUnitCrudComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductUnitSetupRouterModule {}
