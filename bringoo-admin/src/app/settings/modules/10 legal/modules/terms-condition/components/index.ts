import { NgModule } from '@angular/core';

import { TermsConditionFormCrudComponent } from './terms-condition-crud/terms-condition-form-crud.component';
import { TermsConditionFormCreateComponent } from './terms-condition-form-create/terms-condition-form-create.component';
import { TermsConditionFormFilterComponent } from './terms-condition-form-filter/terms-condition-form-filter.component';
import { TermsConditionFormSubparagraphsComponent } from './terms-condition-form-subparagraphs/terms-condition-form-subparagraphs.component';
import { TermsConditionFormUpdateComponent } from './terms-condition-form-update/terms-condition-form-update.component';

export const components: Required<NgModule>['declarations'] = [
  TermsConditionFormCrudComponent,
  TermsConditionFormFilterComponent,
  TermsConditionFormCreateComponent,
  TermsConditionFormSubparagraphsComponent,
  TermsConditionFormUpdateComponent,
];
