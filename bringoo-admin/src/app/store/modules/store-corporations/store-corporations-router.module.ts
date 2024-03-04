import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreCorporatesCrudComponent } from './components/store-corporates-crud/store-corporates-crud.component';

const routes: Routes = [{ path: '', component: StoreCorporatesCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreCorporationsRouterModule {}
