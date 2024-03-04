import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../layout/components/page-not-found/page-not-found.component';
import { OrdersCardPageComponent } from './components/orders-card-page/orders-card-page.component';
import { AbandonedShoppingCartModule } from './modules/abandoned-shopping-cart/abandoned-shopping-cart.module';
import { StoreSchedulerModule } from './modules/delivery-scheduler/store-scheduler.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { OrderBoardModule } from './modules/order-board/order-board.module';
import { OrdersTableModule } from './modules/orders-table/orders-table.module';

const routes: Routes = [
  {
    path: 'all',
    loadChildren: (): Promise<Type<OrdersTableModule>> =>
      import('./modules/orders-table/orders-table.module').then((m: { OrdersTableModule: Type<OrdersTableModule> }) => m.OrdersTableModule),
  },
  {
    path: 'invoices',
    data: { breadcrumb: 'Invoices' },
    loadChildren: (): Promise<Type<InvoicesModule>> =>
      import('./modules/invoices/invoices.module').then((m: { InvoicesModule: Type<InvoicesModule> }) => m.InvoicesModule),
  },
  {
    path: 'abandoned-shopping-cart',
    data: { breadcrumb: 'Abandoned carts' },
    loadChildren: (): Promise<Type<AbandonedShoppingCartModule>> =>
      import('./modules/abandoned-shopping-cart/abandoned-shopping-cart.module').then(
        (m: { AbandonedShoppingCartModule: Type<AbandonedShoppingCartModule> }) => m.AbandonedShoppingCartModule,
      ),
  },
  {
    path: 'order-board',
    data: { breadcrumb: 'Order Board' },
    loadChildren: (): Promise<Type<OrderBoardModule>> =>
      import('./modules/order-board/order-board.module').then((m: { OrderBoardModule: Type<OrderBoardModule> }) => m.OrderBoardModule),
  },
  {
    path: 'store-delivery-scheduler',
    data: { breadcrumb: 'Store Delivery Scheduler' },
    loadChildren: (): Promise<Type<StoreSchedulerModule>> =>
      import('./modules/delivery-scheduler/store-scheduler.module').then(
        (m: { StoreSchedulerModule: Type<StoreSchedulerModule> }) => m.StoreSchedulerModule,
      ),
  },
  { path: '', pathMatch: 'full', component: OrdersCardPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRouterModule {}
