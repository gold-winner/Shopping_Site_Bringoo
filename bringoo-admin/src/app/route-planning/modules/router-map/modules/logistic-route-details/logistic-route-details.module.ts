import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { DynamicIoModule } from 'ng-dynamic-component';

import { SharedModule } from '../../../../../../shared/shared.module';
import { components } from './components';

@NgModule({
  exports: [...components],
  declarations: [...components],
  imports: [SharedModule, GoogleMapsModule, DynamicIoModule],
})
export class LogisticRouteDetailsModule {}
