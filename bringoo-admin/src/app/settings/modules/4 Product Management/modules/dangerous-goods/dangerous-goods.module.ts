import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { DangerousGoodsCreateFormComponent } from './components/dangerous-goods-create-form/dangerous-goods-create-form.component';
import { DangerousGoodsCrudComponent } from './components/dangerous-goods-crud/dangerous-goods-crud.component';
import { DangerousGoodsUpdateFormComponent } from './components/dangerous-goods-update-form/dangerous-goods-update-form.component';
import { DangerousGoodsFilterFormComponent } from './components/product-category-filter-form/dangerous-goods-filter-form.component';
import { DangerousGoodsRouterModule } from './dangerous-goods-router.module';

@NgModule({
  declarations: [
    DangerousGoodsCrudComponent,
    DangerousGoodsCreateFormComponent,
    DangerousGoodsUpdateFormComponent,
    DangerousGoodsFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, DangerousGoodsRouterModule],
})
export class DangerousGoodsModule {}
