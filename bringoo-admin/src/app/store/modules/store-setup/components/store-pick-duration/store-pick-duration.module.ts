import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StorePickDurationCreateFormComponent } from './components/store-pick-duration-create-form/store-pick-duration-create-form.component';
import { StorePickDurationCrudComponent } from './components/store-pick-duration-crud/store-pick-duration-crud.component';
import { StorePickDurationFilterFormComponent } from './components/store-pick-duration-filter-form/store-pick-duration-filter-form.component';
import { StorePickDurationUpdateFormComponent } from './components/store-pick-duration-update-form/store-pick-duration-update-form.component';
import { StorePickDurationRouterModule } from './store-pick-duration-router.module';

@NgModule({
  declarations: [
    StorePickDurationCrudComponent,
    StorePickDurationCreateFormComponent,
    StorePickDurationUpdateFormComponent,
    StorePickDurationFilterFormComponent,
  ],
  imports: [SharedModule, CrudModule, StorePickDurationRouterModule],
})
export class StorePickDurationModule {}
