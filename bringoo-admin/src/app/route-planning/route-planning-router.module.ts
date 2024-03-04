import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../layout/components/page-not-found/page-not-found.component';
import { BacklogModule } from './modules/backlog/backlog.module';
import { RouterMapModule } from './modules/router-map/router-map.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'route-map',
  },
  {
    path: 'route-map',
    loadChildren: (): Promise<Type<RouterMapModule>> =>
      import('./modules/router-map/router-map.module').then((m: { RouterMapModule: Type<RouterMapModule> }) => m.RouterMapModule),
  },
  {
    path: 'backlog',
    loadChildren: (): Promise<Type<BacklogModule>> =>
      import('./modules/backlog/backlog.module').then((m: { BacklogModule: Type<BacklogModule> }) => m.BacklogModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutePlanningRouterModule {}
