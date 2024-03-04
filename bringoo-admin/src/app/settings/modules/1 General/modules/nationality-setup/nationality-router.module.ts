import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NationalityCrudComponent } from './components/nationality-crud/nationality-crud.component';

const routes: Routes = [{ path: '', component: NationalityCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NationalityRouterModule {}
