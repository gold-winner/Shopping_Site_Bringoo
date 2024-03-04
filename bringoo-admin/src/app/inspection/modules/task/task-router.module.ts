import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../../../layout/components/page-not-found/page-not-found.component';
import { TaskClosedCrudComponent } from './components/task-closed-crud/task-closed-crud.component';
import { TaskOpenedCrudComponent } from './components/task-opened-crud/task-opened-crud.component';

const routes: Routes = [
  { path: 'opened', component: TaskOpenedCrudComponent },
  { path: 'closed', component: TaskClosedCrudComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRouterModule {}
