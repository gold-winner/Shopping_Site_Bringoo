import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { RouteMapComponent } from './components/route-map/route-map.component';

const routes: Routes = [
  { path: '', component: RouteMapComponent, data: { breadcrumb: 'Route Map' } },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouterMapRouterModule {}
