import { NgModule } from '@angular/core';
import { DynamicIoModule } from 'ng-dynamic-component';

import { SharedModule } from '../../../../../../shared/shared.module';
import { DistancePipe } from '../../pipe/distance.pipe';
import { components } from './components';

@NgModule({
  exports: [...components],
  declarations: [...components, DistancePipe],
  imports: [SharedModule, DynamicIoModule],
})
export class LogisticOrdersModule {}
