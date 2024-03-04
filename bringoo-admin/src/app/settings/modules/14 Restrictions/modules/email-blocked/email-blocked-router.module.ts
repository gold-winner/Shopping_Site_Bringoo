import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailBlockedCrudComponent } from './components/email-blocked-crud/email-blocked-crud.component';

const routes: Routes = [{ path: '', component: EmailBlockedCrudComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailBlockedRouterModule {}
