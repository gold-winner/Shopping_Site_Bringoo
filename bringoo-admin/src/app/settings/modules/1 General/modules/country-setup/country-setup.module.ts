import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { CountryCreateFormComponent } from './components/country-create-form/country-create-form.component';
import { CountryCrudComponent } from './components/country-crud/country-crud.component';
import { CountryFilterFormComponent } from './components/country-filter-form/country-filter-form.component';
import { CountryUpdateFormComponent } from './components/country-update-form/country-update-form.component';
import { CountrySetupRouterModule } from './country-setup-router.module';

@NgModule({
  declarations: [CountryCrudComponent, CountryCreateFormComponent, CountryUpdateFormComponent, CountryFilterFormComponent],
  imports: [SharedModule, CrudModule, CountrySetupRouterModule],
  exports: [CountryFilterFormComponent],
})
export class CountrySetupModule {}
