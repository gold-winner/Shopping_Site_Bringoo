import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../../../layout/components/page-not-found/page-not-found.component';
import { ReplacementOptionCrudComponent } from './components/replacement-option-crud/replacement-option-crud.component';

const routes: Routes = [
  { path: '', component: ReplacementOptionCrudComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReplacementOptionRouterModule {}
