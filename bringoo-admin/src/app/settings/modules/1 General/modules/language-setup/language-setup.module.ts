import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { LanguageCreateFormComponent } from './components/language-create-form/language-create-form.component';
import { LanguageCrudComponent } from './components/language-crud/language-crud.component';
import { LanguageFilterFormComponent } from './components/language-filter-form/language-filter-form.component';
import { LanguageUpdateFormComponent } from './components/language-update-form/language-update-form.component';
import { LanguageSetupRouterModule } from './language-setup-router.module';

@NgModule({
  declarations: [LanguageCrudComponent, LanguageCreateFormComponent, LanguageUpdateFormComponent, LanguageFilterFormComponent],
  imports: [SharedModule, CrudModule, LanguageSetupRouterModule],
})
export class LanguageSetupModule {}
