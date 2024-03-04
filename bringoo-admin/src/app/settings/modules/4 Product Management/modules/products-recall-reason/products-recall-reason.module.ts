import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ProductRecallReasonCreateFormComponent } from './components/create-form/create-form.component';
import { ProductRecallReasonCrudListComponent } from './components/crud-list/crud-list.component';
import { ProductRecallReasonFilterFormComponent } from './components/filter-form/filter-form.component';
import { ProductRecallReasonUpdateFormComponent } from './components/update-form/update-form.component';
import { ProductsRecallReasonRouterModule } from './products-recall-reason-router.module';

@NgModule({
  declarations: [
    ProductRecallReasonCreateFormComponent,
    ProductRecallReasonFilterFormComponent,
    ProductRecallReasonCrudListComponent,
    ProductRecallReasonUpdateFormComponent,
  ],
  imports: [ProductsRecallReasonRouterModule, SharedModule, CrudModule],
})
export class ProductsRecallReasonModule {}
