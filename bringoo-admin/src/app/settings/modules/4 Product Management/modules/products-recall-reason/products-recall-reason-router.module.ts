import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductRecallReasonCrudListComponent } from './components/crud-list/crud-list.component';

const routes: Routes = [{ path: '', component: ProductRecallReasonCrudListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRecallReasonRouterModule {}
