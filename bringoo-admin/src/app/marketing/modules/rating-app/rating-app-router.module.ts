import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { RatingAppHistoryCrudComponent } from './components/rating-app-history-crud/rating-app-history-crud.component';

const routes: Routes = [
  { path: '', component: RatingAppHistoryCrudComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingAppRouterModule {}
