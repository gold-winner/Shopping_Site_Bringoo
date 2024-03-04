import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../layout/components/page-not-found/page-not-found.component';
import { CrudSurveysComponent } from './components/crud-surveys/crud-surveys.component';

const routes: Routes = [
  { path: '', component: CrudSurveysComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveysRouterModule {}
