import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { DynamicIoModule } from 'ng-dynamic-component';

import { SharedModule } from '../../../../shared/shared.module';
import { BacklogRouterModule } from './backlog-router.module';
import { components } from './components';
import { pipe } from './pipe';
import { BacklogService } from './services/backlog.service';

@NgModule({
  exports: [],
  declarations: [...components, ...pipe],
  providers: [BacklogService],
  imports: [SharedModule, BacklogRouterModule, DynamicIoModule, GoogleMapsModule],
})
export class BacklogModule {}
