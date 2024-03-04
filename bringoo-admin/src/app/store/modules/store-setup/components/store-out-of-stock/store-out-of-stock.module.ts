import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreOutOfStockCreateFormComponent } from './components/store-out-of-stock-create-form/store-out-of-stock-create-form.component';
import { StoreOutOfStockCrudComponent } from './components/store-out-of-stock-crud/store-out-of-stock-crud.component';
import { StoreOutOfStockFilterFormComponent } from './components/store-out-of-stock-filter-form/store-out-of-stock-filter-form.component';
import { StoreOutOfStockUpdateFormComponent } from './components/store-out-of-stock-update-form/store-out-of-stock-update-form.component';
import { OutOfStockRoutingModule } from './store-out-of-stock-routing.module';

@NgModule({
  declarations: [
    StoreOutOfStockCrudComponent,
    StoreOutOfStockCreateFormComponent,
    StoreOutOfStockUpdateFormComponent,
    StoreOutOfStockFilterFormComponent,
  ],
  imports: [OutOfStockRoutingModule, SharedModule, CrudModule],
})
export class OutOfStockModule {}
