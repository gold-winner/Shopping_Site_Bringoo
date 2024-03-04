import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { VatSetupCreateFormComponent } from './components/vat-setup-create-form/vat-setup-create-form.component';
import { VatSetupCrudComponent } from './components/vat-setup-crud/vat-setup-crud.component';
import { VatSetupFilterFormComponent } from './components/vat-setup-filter-form/vat-setup-filter-form.component';
import { VatSetupUpdateFormComponent } from './components/vat-setup-update-form/vat-setup-update-form.component';
import { VatSetupRouterModule } from './vat-setup-router.module';

@NgModule({
  declarations: [VatSetupCrudComponent, VatSetupCreateFormComponent, VatSetupUpdateFormComponent, VatSetupFilterFormComponent],
  imports: [SharedModule, CrudModule, VatSetupRouterModule],
  exports: [VatSetupFilterFormComponent],
})
export class VatSetupModule {}
