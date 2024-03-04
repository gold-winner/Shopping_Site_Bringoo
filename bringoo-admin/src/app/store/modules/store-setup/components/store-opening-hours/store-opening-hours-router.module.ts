import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreOpeningHoursCrudComponent } from './components/store-opening-hours-crud/store-opening-hours-crud.component';

const routes: Routes = [{ path: '', component: StoreOpeningHoursCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreOpeningHoursRouterModule {}
