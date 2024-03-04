import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VatSetupCrudComponent } from './components/vat-setup-crud/vat-setup-crud.component';

const routes: Routes = [{ path: '', component: VatSetupCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VatSetupRouterModule {}
