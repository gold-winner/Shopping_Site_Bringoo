import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDisclaimerCrudComponent } from './components/product-disclaimer-crud/product-disclaimer-crud.component';

const routes: Routes = [
  {
    path: '',
    component: ProductDisclaimerCrudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDisclaimerRouter {}
