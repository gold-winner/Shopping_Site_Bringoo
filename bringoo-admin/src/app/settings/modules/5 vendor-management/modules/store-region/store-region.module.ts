import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreRegionComponent } from './components/crud-store-region/store-region.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { StoreRegionCreateFormComponent } from './components/store-region-create-form/store-region-create-form.component';
import { StoreRegionUpdateFormComponent } from './components/store-region-update-form/store-region-update-form.component';
import { StoreRegionRouterModule } from './store-region-router.module';

@NgModule({
  declarations: [StoreRegionComponent, StoreRegionCreateFormComponent, StoreRegionUpdateFormComponent, FilterFormComponent],
  imports: [StoreRegionRouterModule, SharedModule, CrudModule],
})
export class StoreRegionModule {}
