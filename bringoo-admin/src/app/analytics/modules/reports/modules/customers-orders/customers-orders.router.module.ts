import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersOrdersPageComponent } from './components/customers-orders-page/customers-orders-page.component';

const routes: Routes = [{ path: '', component: CustomersOrdersPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersOrdersRouterModule {}
