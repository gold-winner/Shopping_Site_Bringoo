import { NgModule } from '@angular/core';
import { DynamicIoModule } from 'ng-dynamic-component';

import { SharedModule } from '../../shared.module';
import { components } from './components';
import { CrudComponent } from './components/crud/crud.component';
import { pipes } from './pipes';
import { JoinPipe } from './pipes/join.pipe';

@NgModule({
  declarations: [CrudComponent, ...pipes, ...components],
  imports: [SharedModule, DynamicIoModule],
  exports: [CrudComponent, JoinPipe],
})
export class CrudModule {}
