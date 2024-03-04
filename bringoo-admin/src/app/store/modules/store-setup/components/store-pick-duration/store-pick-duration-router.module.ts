import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StorePickDurationCrudComponent } from './components/store-pick-duration-crud/store-pick-duration-crud.component';

const routes: Routes = [{ path: '', component: StorePickDurationCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorePickDurationRouterModule {}
