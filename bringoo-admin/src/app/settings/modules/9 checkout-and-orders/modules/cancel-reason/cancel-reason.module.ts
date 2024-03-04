import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { CancelReasonRouterModule } from './cancel-reason-router.module';
import { CancelReasonCreateFormComponent } from './components/cancel-reason-create-form/cancel-reason-create-form.component';
import { CancelReasonCrudComponent } from './components/cancel-reason-crud/cancel-reason-crud.component';
import { CancelReasonFilterFormComponent } from './components/cancel-reason-filter-form/cancel-reason-filter-form.component';
import { CancelReasonUpdateFormComponent } from './components/vendor-type-update-form/cancel-reason-update-form.component';

@NgModule({
  declarations: [
    CancelReasonCrudComponent,
    CancelReasonCreateFormComponent,
    CancelReasonUpdateFormComponent,
    CancelReasonFilterFormComponent,
  ],
  imports: [CancelReasonRouterModule, SharedModule, CrudModule],
})
export class CancelReasonModule {}
