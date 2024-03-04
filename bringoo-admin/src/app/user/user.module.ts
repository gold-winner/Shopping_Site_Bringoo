import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { ListComponent } from './components/list/list.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [ListComponent, CreateFormComponent, UpdateFormComponent],
  imports: [SharedModule, UserRoutingModule],
})
export class UserModule {}
