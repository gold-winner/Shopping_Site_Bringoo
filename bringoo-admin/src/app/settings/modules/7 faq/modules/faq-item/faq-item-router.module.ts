import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../../../layout/components/page-not-found/page-not-found.component';
import { FaqItemCrudComponent } from './components/faq-item-crud/faq-item-crud.component';

const routes: Routes = [
  { path: '', component: FaqItemCrudComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqItemRouterModule {}
