import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ProductUnitCreateFormComponent } from './components/product-unit-create-form/product-unit-create-form.component';
import { ProductUnitCrudComponent } from './components/product-unit-crud/product-unit-crud.component';
import { ProductUnitFilterFormComponent } from './components/product-unit-filter-form/product-unit-filter-form.component';
import { ProductUnitUpdateFormComponent } from './components/product-unit-update-form/product-unit-update-form.component';
import { ProductUnitSetupRouterModule } from './product-unit-setup-router.module';

@NgModule({
  declarations: [ProductUnitCrudComponent, ProductUnitCreateFormComponent, ProductUnitUpdateFormComponent, ProductUnitFilterFormComponent],
  imports: [SharedModule, CrudModule, ProductUnitSetupRouterModule],
})
export class ProductUnitSetupModule {}
