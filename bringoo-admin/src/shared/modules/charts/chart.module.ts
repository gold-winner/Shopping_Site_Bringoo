import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';

import { SharedModule } from '../../shared.module';
import { components } from './components';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, NgChartsModule, NgxChartsModule],
  exports: [...components, SharedModule],
})
export class ChartModule {}
