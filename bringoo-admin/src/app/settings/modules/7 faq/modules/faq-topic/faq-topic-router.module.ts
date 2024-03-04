import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../../../layout/components/page-not-found/page-not-found.component';
import { FaqTopicCrudComponent } from './components/faq-topic-crud/faq-topic-crud.component';

const routes: Routes = [
  { path: '', component: FaqTopicCrudComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqTopicRouterModule {}
