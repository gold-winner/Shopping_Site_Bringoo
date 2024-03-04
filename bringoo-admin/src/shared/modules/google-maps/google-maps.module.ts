import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { SharedModule } from '../../shared.module';
import { components } from './components';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, GoogleMapsModule],
  exports: [...components],
})
export class GoogleMapsCustomComponentsModule {}
