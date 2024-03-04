import { NgModule } from '@angular/core';

import { PrivacyPolicyCrudComponent } from './privacy-policy-crud/privacy-policy-crud.component';
import { PrivacyPolicyFormCreateComponent } from './privacy-policy-form-create/privacy-policy-form-create.component';
import { PrivacyPolicyFormFilterComponent } from './privacy-policy-form-filter/privacy-policy-form-filter.component';
import { PrivacyPolicyFormUpdateComponent } from './privacy-policy-form-update/privacy-policy-form-update.component';

export const components: Required<NgModule>['declarations'] = [
  PrivacyPolicyCrudComponent,
  PrivacyPolicyFormFilterComponent,
  PrivacyPolicyFormCreateComponent,
  PrivacyPolicyFormUpdateComponent,
];
