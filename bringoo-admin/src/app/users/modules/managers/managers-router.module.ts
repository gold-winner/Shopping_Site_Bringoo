import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { ManagersCrudComponent } from './components/managers-crud-staff/managers-crud.component';
import { ManagersDetailComponent } from './components/managers-detail/managers-detail.component';

const routes: Routes = [
  { path: '', component: ManagersCrudComponent, pathMatch: 'full' },
  { path: 'details/:id', component: ManagersDetailComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagersRouterModule {}
