import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ConsultationRequestCrudListComponent } from './consultation-request-crud-list/consultation-request-crud-list.component';
import { ConsultationRequestDetailsComponent } from './consultation-request-details/consultation-request-details.component';
import { ConsultationRequestFilterFormComponent } from './consultation-request-filter-form/consultation-request-filter-form.component';
import { ConsultationRequestRouterModule } from './consultation-request-router.module';

@NgModule({
  declarations: [ConsultationRequestFilterFormComponent, ConsultationRequestCrudListComponent, ConsultationRequestDetailsComponent],
  imports: [ConsultationRequestRouterModule, SharedModule, CrudModule],
})
export class ConsultationRequestModule {}
