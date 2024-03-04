import { NgModule } from '@angular/core';

import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { SharedModule } from '../../../../shared/shared.module';
import { TaskClosedCrudComponent } from './components/task-closed-crud/task-closed-crud.component';
import { TaskClosedFilterFormComponent } from './components/task-closed-filter-form/task-closed-filter-form.component';
import { TaskOpenedCrudComponent } from './components/task-opened-crud/task-opened-crud.component';
import { TaskOpenedFilterFormComponent } from './components/task-opened-filter-form/task-opened-filter-form.component';
import { TaskRouterModule } from './task-router.module';

@NgModule({
  declarations: [TaskOpenedCrudComponent, TaskClosedCrudComponent, TaskOpenedFilterFormComponent, TaskClosedFilterFormComponent],
  imports: [SharedModule, CrudModule, TaskRouterModule],
})
export class TaskModule {}
