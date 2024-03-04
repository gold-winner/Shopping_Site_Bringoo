import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreWeightOptionCrudComponent } from './components/store-weight-option-crud/store-weight-option-crud.component';

const routes: Routes = [{ path: '', component: StoreWeightOptionCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreWeightOptionRouterModule {}
