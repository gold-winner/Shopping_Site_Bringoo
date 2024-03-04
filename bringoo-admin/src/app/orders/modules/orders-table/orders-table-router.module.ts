import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrdersCrudComponent } from './components/orders-crud/orders-crud.component';

const routes: Routes = [
  { path: '', component: OrdersCrudComponent },
  { path: 'create', component: OrderCreateComponent },
  { path: 'detail/:id', component: OrderDetailComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersTableRouterModule {}
