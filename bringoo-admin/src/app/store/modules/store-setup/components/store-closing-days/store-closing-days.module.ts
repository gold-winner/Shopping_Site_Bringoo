import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreClosingDaysCreateFormComponent } from './components/store-closing-days-create-form/store-closing-days-create-form.component';
import { StoreClosingDaysCrudComponent } from './components/store-closing-days-crud/store-closing-days-crud.component';
import { StoreClosingDaysFilterFormComponent } from './components/store-closing-days-filter-form/store-closing-days-filter-form.component';
import { StoreClosingDaysUpdateFormComponent } from './components/store-closing-days-update-form/store-closing-days-update-form.component';
import { StoreClosingDaysRouterModule } from './store-closing-days-router.module';

@NgModule({
  declarations: [
    StoreClosingDaysCrudComponent,
    StoreClosingDaysCreateFormComponent,
    StoreClosingDaysUpdateFormComponent,
    StoreClosingDaysFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, StoreClosingDaysRouterModule],
})
export class StoreClosingDaysModule {}
