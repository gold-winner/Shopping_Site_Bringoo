import { NgModule } from '@angular/core';

import { ChartModule } from '../../../../shared/modules/charts/chart.module';
import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { MarkdownModule } from '../../../../shared/modules/markdown/markdown.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductsModule } from '../../../products/modules/products/products.module';
import { components } from './components/order-create/components';
import { SelectDriverFilterFormComponent } from './components/order-create/components/select-driver/select-driver-filter-form/select-driver-filter-form.component';
import { SelectStoreComponent } from './components/order-create/components/select-store/select-store.component';
import { OrdersTableRouterModule } from './orders-table-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, CrudModule, OrdersTableRouterModule, ProductsModule, MarkdownModule, ChartModule],
  exports: [SelectStoreComponent, SelectDriverFilterFormComponent],
})
export class OrdersTableModule {}
