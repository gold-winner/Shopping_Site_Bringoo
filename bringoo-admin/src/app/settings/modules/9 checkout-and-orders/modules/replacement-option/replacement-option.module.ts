import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ReplacementOptionCreateFormComponent } from './components/cancel-reason-create-form/replacement-option-create-form.component';
import { ReplacementOptionCrudComponent } from './components/replacement-option-crud/replacement-option-crud.component';
import { ReplacementOptionFilterFormComponent } from './components/replacement-option-filter-form/replacement-option-filter-form.component';
import { ReplacementOptionUpdateFormComponent } from './components/replacement-option-update-form/replacement-option-update-form.component';
import { ReplacementOptionRouterModule } from './replacement-option-router.module';

@NgModule({
  declarations: [
    ReplacementOptionCrudComponent,
    ReplacementOptionCreateFormComponent,
    ReplacementOptionUpdateFormComponent,
    ReplacementOptionFilterFormComponent,
  ],
  imports: [ReplacementOptionRouterModule, SharedModule, CrudModule],
})
export class ReplacementOptionModule {}
