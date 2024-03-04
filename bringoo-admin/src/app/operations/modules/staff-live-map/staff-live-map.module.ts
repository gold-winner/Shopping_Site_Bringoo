import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { SharedModule } from '../../../../shared/shared.module';
import { StaffLiveMapComponent } from './components/staff-live-map/staff-live-map.component';
import { StaffLiveMapRouterModule } from './staff-live-map.router.module';

@NgModule({
  declarations: [StaffLiveMapComponent],
  imports: [SharedModule, StaffLiveMapRouterModule, GoogleMapsModule],
})
export class StaffLiveMapModule {}
