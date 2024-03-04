import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaffLiveMapComponent } from './components/staff-live-map/staff-live-map.component';

const routes: Routes = [{ path: '', component: StaffLiveMapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffLiveMapRouterModule {}
