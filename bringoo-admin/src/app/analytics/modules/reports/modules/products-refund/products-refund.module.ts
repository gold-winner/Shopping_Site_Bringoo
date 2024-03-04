import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../../shared/shared.module';
import { ProductsRefundComponent } from './components/products-refund/products-refund.component';
import { ProductsRefundFilterFormComponent } from './components/products-refund-filter-form/products-refund-filter-form.component';
import { ReportsRouterModule } from './products-refund.router.module';

@NgModule({
  declarations: [ProductsRefundComponent, ProductsRefundFilterFormComponent],
  imports: [SharedModule, ReportsRouterModule],
})
export class ProductsRefundModule {}
