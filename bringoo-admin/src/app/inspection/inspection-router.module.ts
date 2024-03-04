import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/helpers/auth.guard';
import { TaskModule } from './modules/task/task.module';

const routes: Routes = [
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<TaskModule>> =>
      import('./modules/task/task.module').then((m: { TaskModule: Type<TaskModule> }) => m.TaskModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionRouterModule {}
