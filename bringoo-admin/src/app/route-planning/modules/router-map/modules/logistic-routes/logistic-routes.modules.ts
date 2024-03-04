import { NgModule } from '@angular/core';
import { DynamicIoModule } from 'ng-dynamic-component';

import { SharedModule } from '../../../../../../shared/shared.module';
import { components } from './components';

@NgModule({
  exports: [...components, SharedModule],
  declarations: [...components],
  imports: [SharedModule, DynamicIoModule],
})
export class LogisticRoutesModules {}
