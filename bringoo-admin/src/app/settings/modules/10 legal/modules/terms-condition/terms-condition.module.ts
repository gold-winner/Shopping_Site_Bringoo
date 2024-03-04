import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { components } from './components';
import { TermsConditionRouterModule } from './terms-condition-router.module';

@NgModule({
  declarations: [...components],
  imports: [CrudModule, SharedModule, TermsConditionRouterModule],
})
export class TermsConditionModule {}
