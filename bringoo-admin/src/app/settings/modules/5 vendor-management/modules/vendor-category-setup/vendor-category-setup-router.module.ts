import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../../../layout/components/page-not-found/page-not-found.component';
import { VendorCategoryCrudComponent } from './components/vendor-category-crud/vendor-category-crud.component';

const routes: Routes = [
  { path: '', component: VendorCategoryCrudComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorCategorySetupRouterModule {}
