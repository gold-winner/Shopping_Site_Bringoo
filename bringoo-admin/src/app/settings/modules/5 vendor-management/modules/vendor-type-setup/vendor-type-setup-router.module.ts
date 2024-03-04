import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../../../layout/components/page-not-found/page-not-found.component';
import { CrudVendorTypeComponent } from './components/crud-vendor-type/crud-vendor-type.component';

const routes: Routes = [
  { path: '', component: CrudVendorTypeComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorTypeSetupRouterModule {}
