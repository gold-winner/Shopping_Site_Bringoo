import { NgModule } from '@angular/core';

import { CreateFormComponent } from './create-form/create-form.component';
import { ListComponent } from './list/list.component';
import { UpdateFormComponent } from './update-form/update-form.component';

export const components: NgModule['declarations'] = [ListComponent, CreateFormComponent, UpdateFormComponent];
