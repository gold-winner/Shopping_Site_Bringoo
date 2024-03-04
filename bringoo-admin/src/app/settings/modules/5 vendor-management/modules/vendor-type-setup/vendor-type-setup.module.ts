import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { CurrencyRoutingModule } from '../../../2 Financial Management/modules/currency-setup/currency-routing.module';
import { CrudVendorTypeComponent } from './components/crud-vendor-type/crud-vendor-type.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { VendorTypeCreateFormComponent } from './components/vendor-type-create-form/vendor-type-create-form.component';
import { VendorTypeUpdateFormComponent } from './components/vendor-type-update-form/vendor-type-update-form.component';
import { VendorTypeSetupRouterModule } from './vendor-type-setup-router.module';

@NgModule({
  declarations: [CrudVendorTypeComponent, VendorTypeCreateFormComponent, VendorTypeUpdateFormComponent, FilterFormComponent],
  imports: [VendorTypeSetupRouterModule, CurrencyRoutingModule, SharedModule, CrudModule],
})
export class VendorTypeSetupModule {}
