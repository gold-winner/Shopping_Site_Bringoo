import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrudStoreBrandComponent } from './components/crud-store-brand/crud-store-brand.component';

const routes: Routes = [{ path: '', component: CrudStoreBrandComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreBrandRoutingModule {}
