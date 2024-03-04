import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../../shared/shared.module';
import { SalesProductsFilterFormComponent } from './components/sales-filter-form/sales-products-filter-form.component';
import { SalesProductsComponent } from './components/sales-products/sales-products.component';
import { ReportsRouterModule } from './sales-products.router.module';

@NgModule({
  declarations: [SalesProductsComponent, SalesProductsFilterFormComponent],
  imports: [SharedModule, ReportsRouterModule],
})
export class SalesProductsModule {}
