import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivacyPolicyCrudComponent } from './components/privacy-policy-crud/privacy-policy-crud.component';

const routes: Routes = [{ path: '', component: PrivacyPolicyCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyPolicyRouterModule {}
