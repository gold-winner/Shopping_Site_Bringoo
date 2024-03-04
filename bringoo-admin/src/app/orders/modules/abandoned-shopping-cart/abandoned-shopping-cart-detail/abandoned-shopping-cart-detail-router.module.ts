import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../../layout/components/page-not-found/page-not-found.component';
import { AbandonedShoppingCartDetailComponent } from './components/abandoned-shopping-cart-detail/abandoned-shopping-cart-detail.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Shopping Cart' },
    component: AbandonedShoppingCartDetailComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbandonedShoppingCartDetailRouterModule {}
