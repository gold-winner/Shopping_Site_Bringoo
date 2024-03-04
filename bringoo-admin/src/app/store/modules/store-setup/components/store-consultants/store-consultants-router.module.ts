import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreConsultantsCrudComponent } from './components/store-consultants-crud/store-consultants-crud.component';

const routes: Routes = [
  {
    path: '',
    component: StoreConsultantsCrudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreConsultantsRouterModule {}
