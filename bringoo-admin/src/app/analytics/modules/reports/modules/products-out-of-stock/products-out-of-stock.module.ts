import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../../shared/shared.module';
import { ProductsOutOfStockComponent } from './components/products-out-of-stock/products-out-of-stock.component';
import { ProductsOutOfStockFilterFormComponent } from './components/products-refund-filter-form/products-out-of-stock-filter-form.component';
import { ReportsRouterModule } from './products-out-of-stock.router.module';

@NgModule({
  declarations: [ProductsOutOfStockComponent, ProductsOutOfStockFilterFormComponent],
  imports: [SharedModule, ReportsRouterModule],
})
export class ProductsOutOfStockModule {}
