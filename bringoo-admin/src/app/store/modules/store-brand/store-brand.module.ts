import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { CrudStoreBrandComponent } from './components/crud-store-brand/crud-store-brand.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { StoreBrandRoutingModule } from './store-brand-routing.module';

@NgModule({
  declarations: [CrudStoreBrandComponent, CreateFormComponent, FilterFormComponent],
  imports: [StoreBrandRoutingModule, SharedModule, CrudModule],
})
export class StoreBrandModule {}
