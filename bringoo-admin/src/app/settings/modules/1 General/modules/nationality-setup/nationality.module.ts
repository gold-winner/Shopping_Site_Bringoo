import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { components } from './components';
import { NationalityRouterModule } from './nationality-router.module';

@NgModule({
  declarations: [...components],
  imports: [SharedModule, CrudModule, NationalityRouterModule],
})
export class NationalityModule {}
