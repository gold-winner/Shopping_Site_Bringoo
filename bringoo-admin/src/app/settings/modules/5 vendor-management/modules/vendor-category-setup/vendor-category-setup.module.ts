import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { CurrencyRoutingModule } from '../../../2 Financial Management/modules/currency-setup/currency-routing.module';
import { VendorCategoryCreateFormComponent } from './components/vendor-category-create-form/vendor-category-create-form.component';
import { VendorCategoryCrudComponent } from './components/vendor-category-crud/vendor-category-crud.component';
import { VendorCategoryFilterFormComponent } from './components/vendor-category-filter-form/vendor-category-filter-form.component';
import { VendorCategoryUpdateFormComponent } from './components/vendor-category-update-form/vendor-category-update-form.component';
import { VendorCategorySetupRouterModule } from './vendor-category-setup-router.module';

@NgModule({
  declarations: [
    VendorCategoryCrudComponent,
    VendorCategoryCreateFormComponent,
    VendorCategoryUpdateFormComponent,
    VendorCategoryFilterFormComponent,
  ],
  imports: [VendorCategorySetupRouterModule, CurrencyRoutingModule, SharedModule, CrudModule],
})
export class VendorCategorySetupModule {}
