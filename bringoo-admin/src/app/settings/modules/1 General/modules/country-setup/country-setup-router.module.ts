import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountryCrudComponent } from './components/country-crud/country-crud.component';

const routes: Routes = [{ path: '', component: CountryCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountrySetupRouterModule {}
