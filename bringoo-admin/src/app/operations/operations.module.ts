import { NgModule } from '@angular/core';

import { CrudModule } from '../../shared/modules/crud/crud.module';
import { SharedModule } from '../../shared/shared.module';
import { OperationsCardPageComponent } from './components/operations-card-page/operations-card-page.component';
import { OperationsRoutingModule } from './operations-routing.module';

@NgModule({
  declarations: [OperationsCardPageComponent],
  imports: [SharedModule, CrudModule, OperationsRoutingModule],
})
export class OperationsModule {}
