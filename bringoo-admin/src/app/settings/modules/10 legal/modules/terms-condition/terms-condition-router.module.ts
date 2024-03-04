import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TermsConditionFormCrudComponent } from './components/terms-condition-crud/terms-condition-form-crud.component';

const routes: Routes = [{ path: '', component: TermsConditionFormCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsConditionRouterModule {}
