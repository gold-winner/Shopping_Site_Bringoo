import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegalComponent } from './components/legal/legal.component';
import { PrivacyPolicyModule } from './modules/privacy-policy/privacy-policy.module';
import { TermsConditionModule } from './modules/terms-condition/terms-condition.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LegalComponent,
  },
  {
    path: 'terms-condition',
    data: {
      breadcrumb: 'Terms and Condition',
    },
    loadChildren: (): Promise<Type<TermsConditionModule>> =>
      import('./modules/terms-condition/terms-condition.module').then(
        (m: { TermsConditionModule: Type<TermsConditionModule> }) => m.TermsConditionModule,
      ),
  },
  {
    path: 'privacy-policy',
    data: {
      breadcrumb: 'Privacy Policy',
    },
    loadChildren: (): Promise<Type<PrivacyPolicyModule>> =>
      import('./modules/privacy-policy/privacy-policy.module').then(
        (m: { PrivacyPolicyModule: Type<PrivacyPolicyModule> }) => m.PrivacyPolicyModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalRouterModule {}
