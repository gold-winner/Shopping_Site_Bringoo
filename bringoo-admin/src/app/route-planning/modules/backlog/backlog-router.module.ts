import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { BacklogPageComponent } from './components/backlog-page/backlog-page.component';

const routes: Routes = [
  { path: '', component: BacklogPageComponent, data: { breadcrumb: 'Backlog' } },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BacklogRouterModule {}
