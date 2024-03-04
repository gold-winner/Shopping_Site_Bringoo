import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/helpers/auth.guard';
import { RatingAppModule } from './modules/rating-app/rating-app.module';

const routes: Routes = [
  {
    path: 'rating-app',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<RatingAppModule>> =>
      import('./modules/rating-app/rating-app.module').then((m: { RatingAppModule: Type<RatingAppModule> }) => m.RatingAppModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketingRouterModule {}
