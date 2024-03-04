import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../../../layout/components/page-not-found/page-not-found.component';
import { ManagerRolesCrudComponent } from './components/manager-roles-crud/manager-roles-crud.component';

const routes: Routes = [
  { path: '', component: ManagerRolesCrudComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRolesRouterModule {}
