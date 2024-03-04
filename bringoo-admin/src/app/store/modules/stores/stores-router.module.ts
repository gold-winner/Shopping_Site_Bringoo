import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { StoresCrudComponent } from './components/stores-crud/stores-crud.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: StoresCrudComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresRouterModule {}
