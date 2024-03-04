import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreStaffBoundCrudComponent } from './components/store-staff-bound-crud/store-staff-bound-crud.component';

const routes: Routes = [{ path: '', component: StoreStaffBoundCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreStaffBoundRouterModule {}
