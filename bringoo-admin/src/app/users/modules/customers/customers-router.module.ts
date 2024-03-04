import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerCrudComponent } from './components/customer-crud/customer-crud.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';

const routes: Routes = [
  { path: '', component: CustomerCrudComponent, pathMatch: 'full' },
  { path: 'details/:id', component: CustomerDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRouterModule {}
