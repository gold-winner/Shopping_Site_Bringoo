import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ProductDisclaimerCreateFormComponent } from './components/product-disclaimer-create-form/product-disclaimer-create-form.component';
import { ProductDisclaimerCrudComponent } from './components/product-disclaimer-crud/product-disclaimer-crud.component';
import { ProductDisclaimerFilterFormComponent } from './components/product-disclaimer-filter-form/product-disclaimer-filter-form.component';
import { ProductDisclaimerUpdateFormComponent } from './components/product-disclaimer-update-form/product-disclaimer-update-form.component';
import { ProductLinkComponent } from './components/product-link/product-link.component';
import { ProductLinkFilterComponent } from './components/product-link/product-link-filter/product-link-filter.component';
import { ProductDisclaimerRouter } from './product-disclaimer.router';

@NgModule({
  declarations: [
    ProductDisclaimerCrudComponent,
    ProductDisclaimerCreateFormComponent,
    ProductDisclaimerUpdateFormComponent,
    ProductDisclaimerFilterFormComponent,
    ProductLinkComponent,
    ProductLinkFilterComponent,
  ],
  imports: [ProductDisclaimerRouter, SharedModule, CrudModule],
  exports: [ProductDisclaimerCrudComponent],
})
export class ProductDisclaimerModule {}
