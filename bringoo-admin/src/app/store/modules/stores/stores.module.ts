import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { components } from './components';
import { StoresCreateFormComponent } from './components/stores-create-form/stores-create-form.component';
import { StoresCrudComponent } from './components/stores-crud/stores-crud.component';
import { StoresFilterFormComponent } from './components/stores-filter-form/stores-filter-form.component';
import { StoresRouterModule } from './stores-router.module';

@NgModule({
  declarations: [StoresCrudComponent, StoresCreateFormComponent, StoresFilterFormComponent],
  imports: [SharedModule, CrudModule, StoresRouterModule],
  exports: [...components],
})
export class StoresModule {}
