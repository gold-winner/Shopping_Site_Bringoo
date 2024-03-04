import { NgModule, Type } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../../shared/helpers/auth.guard';
import { ReportsComponent } from './components/reports/reports.component';
import { CustomersOrdersModule } from './modules/customers-orders/customers-orders.module';
import { CustomersOverTimeModule } from './modules/customers-over-time/customers-over-time.module';
import { LoyalCustomersModule } from './modules/loyal-customers/loyal-customers.module';
import { OneTimeCustomersModule } from './modules/one-time-customers/one-time-customers.module';
import { OrderPerStoreModule } from './modules/order-per-store/order-per-store.module';
import { ProductsOutOfStockModule } from './modules/products-out-of-stock/products-out-of-stock.module';
import { ProductsRefundModule } from './modules/products-refund/products-refund.module';
import { SalesOverTimeModule } from './modules/sales-over-time/sales-over-time.module';
import { SalesProductsModule } from './modules/sales-products/sales-products.module';
import { SearchTrendsModule } from './modules/search-trends/search-trends.module';
import { StorePerformanceModule } from './modules/store-performance/store-performance.module';

const routes: Routes = [
  {
    path: 'sales-over-time',
    data: { breadcrumb: 'Sales over time' },
    loadChildren: (): Promise<Type<SalesOverTimeModule>> =>
      import('./modules/sales-over-time/sales-over-time.module').then(
        (m: { SalesOverTimeModule: Type<SalesOverTimeModule> }) => m.SalesOverTimeModule,
      ),
  },
  {
    path: 'customers-over-time',
    data: { breadcrumb: 'Customers over time' },
    loadChildren: (): Promise<Type<CustomersOverTimeModule>> =>
      import('./modules/customers-over-time/customers-over-time.module').then(
        (m: { CustomersOverTimeModule: Type<CustomersOverTimeModule> }) => m.CustomersOverTimeModule,
      ),
  },
  {
    path: 'loyal-customers',
    data: { breadcrumb: 'Loyal customers' },
    loadChildren: (): Promise<Type<LoyalCustomersModule>> =>
      import('./modules/loyal-customers/loyal-customers.module').then(
        (m: { LoyalCustomersModule: Type<LoyalCustomersModule> }) => m.LoyalCustomersModule,
      ),
  },
  {
    path: 'one-time-customers',
    data: { breadcrumb: 'One Time Customers' },
    loadChildren: (): Promise<Type<OneTimeCustomersModule>> =>
      import('./modules/one-time-customers/one-time-customers.module').then(
        (m: { OneTimeCustomersModule: Type<OneTimeCustomersModule> }) => m.OneTimeCustomersModule,
      ),
  },
  {
    path: 'sales-product',
    data: { breadcrumb: 'Product sales' },
    loadChildren: (): Promise<Type<SalesProductsModule>> =>
      import('./modules/sales-products/sales-products.module').then(
        (m: { SalesProductsModule: Type<SalesProductsModule> }) => m.SalesProductsModule,
      ),
  },
  {
    path: 'search-trends',
    data: { breadcrumb: 'Search trends' },
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<SearchTrendsModule>> =>
      import('./modules/search-trends/search-trends.module').then(
        (m: { SearchTrendsModule: Type<SearchTrendsModule> }) => m.SearchTrendsModule,
      ),
  },
  {
    path: 'product-refunds',
    data: { breadcrumb: 'Product Refunds' },
    loadChildren: (): Promise<Type<ProductsRefundModule>> =>
      import('./modules/products-refund/products-refund.module').then(
        (m: { ProductsRefundModule: Type<ProductsRefundModule> }) => m.ProductsRefundModule,
      ),
  },
  {
    path: 'products-out-of-stock',
    data: { breadcrumb: 'Products Out Of Stock' },
    loadChildren: (): Promise<Type<ProductsOutOfStockModule>> =>
      import('./modules/products-out-of-stock/products-out-of-stock.module').then(
        (m: { ProductsOutOfStockModule: Type<ProductsOutOfStockModule> }) => m.ProductsOutOfStockModule,
      ),
  },
  {
    path: 'customers-orders',
    data: { breadcrumb: 'Cohorts Sales & Users' },
    loadChildren: (): Promise<Type<CustomersOrdersModule>> =>
      import('./modules/customers-orders/customers-orders.module').then(
        (m: { CustomersOrdersModule: Type<CustomersOrdersModule> }) => m.CustomersOrdersModule,
      ),
  },

  {
    path: 'store-performance',
    data: { breadcrumb: 'Store Performance' },
    loadChildren: (): Promise<Type<StorePerformanceModule>> =>
      import('./modules/store-performance/store-performance.module').then(
        (m: { StorePerformanceModule: Type<StorePerformanceModule> }) => m.StorePerformanceModule,
      ),
  },
  {
    path: 'order-per-store',
    data: { breadcrumb: 'Order Per Store' },
    loadChildren: (): Promise<Type<OrderPerStoreModule>> =>
      import('./modules/order-per-store/order-per-store.module').then(
        (m: { OrderPerStoreModule: Type<OrderPerStoreModule> }) => m.OrderPerStoreModule,
      ),
  },

  { path: '', component: ReportsComponent },
];

export const REPORTS_PATH: string[] = routes.filter(({ path }: Route) => path).map(({ path }: Route) => path ?? '');

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRouterModule {}
