import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductBrandCreateFormComponent } from './components/create-form/product-brand-create-form.component';
import { CrudListComponent } from './components/crud-list/crud-list.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { SubRouterModule } from './sub-router.module';

@NgModule({
  declarations: [ProductBrandCreateFormComponent, FilterFormComponent, CrudListComponent],
  imports: [SubRouterModule, SharedModule, CrudModule],
})
export class ProductBrandModule {}
