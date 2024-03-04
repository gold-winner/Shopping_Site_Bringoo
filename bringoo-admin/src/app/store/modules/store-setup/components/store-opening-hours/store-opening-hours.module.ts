import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreOpeningHoursCreateFormComponent } from './components/store-opening-hours-create-form/store-opening-hours-create-form.component';
import { StoreOpeningHoursCrudComponent } from './components/store-opening-hours-crud/store-opening-hours-crud.component';
import { StoreOpeningHoursFilterFormComponent } from './components/store-opening-hours-filter-form/store-opening-hours-filter-form.component';
import { StoreOpeningHoursUpdateFormComponent } from './components/store-opening-hours-update-form/store-opening-hours-update-form.component';
import { StoreOpeningHoursRouterModule } from './store-opening-hours-router.module';

@NgModule({
  declarations: [
    StoreOpeningHoursCrudComponent,
    StoreOpeningHoursCreateFormComponent,
    StoreOpeningHoursUpdateFormComponent,
    StoreOpeningHoursFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, StoreOpeningHoursRouterModule],
})
export class StoreOpeningHoursModule {}
