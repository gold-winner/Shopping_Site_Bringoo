import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StoreStaffBoundCreateFormComponent } from './components/store-staff-bound-create-form/store-staff-bound-create-form.component';
import { StoreStaffBoundCrudComponent } from './components/store-staff-bound-crud/store-staff-bound-crud.component';
import { StoreStaffBoundFilterComponent } from './components/store-staff-bound-filter/store-staff-bound-filter.component';
import { StoreStaffBoundRouterModule } from './store-staff-bound-router.module';

@NgModule({
  declarations: [StoreStaffBoundCrudComponent, StoreStaffBoundCreateFormComponent, StoreStaffBoundFilterComponent],
  imports: [SharedModule, CrudModule, StoreStaffBoundRouterModule],
  exports: [StoreStaffBoundFilterComponent],
})
export class StoreStaffBoundModule {}
