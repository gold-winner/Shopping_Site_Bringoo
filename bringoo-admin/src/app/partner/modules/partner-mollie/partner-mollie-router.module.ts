import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PartnerMollieCrudListComponent } from './components/partner-mollie-crud-list/partner-mollie-crud-list.component';

const routes: Routes = [{ path: '', component: PartnerMollieCrudListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnerMollieRouterModule {}
