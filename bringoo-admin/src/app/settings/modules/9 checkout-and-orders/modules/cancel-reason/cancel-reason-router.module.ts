import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../../../layout/components/page-not-found/page-not-found.component';
import { CancelReasonCrudComponent } from './components/cancel-reason-crud/cancel-reason-crud.component';

const routes: Routes = [
  { path: '', component: CancelReasonCrudComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelReasonRouterModule {}
