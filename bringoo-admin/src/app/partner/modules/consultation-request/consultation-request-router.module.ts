import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsultationRequestCrudListComponent } from './consultation-request-crud-list/consultation-request-crud-list.component';

const routes: Routes = [{ path: '', component: ConsultationRequestCrudListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultationRequestRouterModule {}
