import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneralComponent } from './components/general/general.component';
import { CountrySetupModule } from './modules/country-setup/country-setup.module';
import { LanguageSetupModule } from './modules/language-setup/language-setup.module';
import { NationalityModule } from './modules/nationality-setup/nationality.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GeneralComponent,
  },
  {
    path: 'language',
    data: {
      breadcrumb: 'Language Setup',
    },
    loadChildren: (): Promise<Type<LanguageSetupModule>> =>
      import('./modules/language-setup/language-setup.module').then(
        (m: { LanguageSetupModule: Type<LanguageSetupModule> }) => m.LanguageSetupModule,
      ),
  },
  {
    path: 'country',
    data: {
      breadcrumb: 'Country Setup',
    },
    loadChildren: (): Promise<Type<CountrySetupModule>> =>
      import('./modules/country-setup/country-setup.module').then(
        (m: { CountrySetupModule: Type<CountrySetupModule> }) => m.CountrySetupModule,
      ),
  },
  {
    path: 'nationality',
    data: {
      breadcrumb: 'Nationality Setup',
    },
    loadChildren: (): Promise<Type<NationalityModule>> =>
      import('./modules/nationality-setup/nationality.module').then(
        (m: { NationalityModule: Type<NationalityModule> }) => m.NationalityModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRouterModule {}
