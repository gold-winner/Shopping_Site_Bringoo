import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { CrudStaffComponent } from './components/crud-staff/crud-staff.component';
import { StaffDetailComponent } from './components/staff-detail/staff-detail.component';

const routes: Routes = [
  { path: '', component: CrudStaffComponent, pathMatch: 'full' },
  { path: 'details/:id', component: StaffDetailComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRouterModule {}
