import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { PartnerMollieCrudListComponent } from './components/partner-mollie-crud-list/partner-mollie-crud-list.component';
import { PartnerMollieFilterFormComponent } from './components/partner-mollie-filter-form/partner-mollie-filter-form.component';
import { PartnerMollieUpdateFormComponent } from './components/partner-mollie-update-form/partner-mollie-update-form.component';
import { PartnerMollieRouterModule } from './partner-mollie-router.module';

@NgModule({
  declarations: [PartnerMollieCrudListComponent, PartnerMollieFilterFormComponent, PartnerMollieUpdateFormComponent],
  imports: [PartnerMollieRouterModule, SharedModule, CrudModule],
})
export class PartnerMollieModule {}
