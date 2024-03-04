import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { AbandonedShoppingCartCrudComponent } from './abandoned-shopping-cart-crud/abandoned-shopping-cart-crud.component';
import { AbandonedShoppingCartDetailModule } from './abandoned-shopping-cart-detail/abandoned-shopping-cart-detail.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AbandonedShoppingCartCrudComponent,
  },
  {
    path: ':id',
    data: { breadcrumb: 'Shopping Cart' },
    loadChildren: (): Promise<Type<AbandonedShoppingCartDetailModule>> =>
      import('./abandoned-shopping-cart-detail/abandoned-shopping-cart-detail.module').then(
        (m: { AbandonedShoppingCartDetailModule: Type<AbandonedShoppingCartDetailModule> }) => m.AbandonedShoppingCartDetailModule,
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbandonedShoppingCartRouterModule {}
