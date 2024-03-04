import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreProductCategoryOutOfStockTimeCreateFormComponent } from './components/out-of-stock-time-create-form/out-of-stock-time-create-form.component';
import { StoreProductCategoryOutOfStockTimeCrudComponent } from './components/out-of-stock-time-crud/out-of-stock-time-crud.component';
import { StoreProductCategoryOutOfStockTimeFilterFormComponent } from './components/out-of-stock-time-filter-form/out-of-stock-time-filter-form.component';
import { StoreProductCategoryOutOfStockTimeUpdateFormComponent } from './components/out-of-stock-time-update-form/out-of-stock-time-update-form.component';
import { StoreProductCategoryOutOfStockTimeRoutingModule } from './out-of-stock-time-routing.module';

@NgModule({
  declarations: [
    StoreProductCategoryOutOfStockTimeCrudComponent,
    StoreProductCategoryOutOfStockTimeCreateFormComponent,
    StoreProductCategoryOutOfStockTimeUpdateFormComponent,
    StoreProductCategoryOutOfStockTimeFilterFormComponent,
  ],
  imports: [StoreProductCategoryOutOfStockTimeRoutingModule, SharedModule, CrudModule],
})
export class StoreProductCategoryOutOfStockTimeModule {}
