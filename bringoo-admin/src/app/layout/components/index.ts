import { NgModule } from '@angular/core';

import { LayoutAuthComponent } from './layout-auth/layout-auth.component';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const layoutComponents: NgModule['declarations'] = [LayoutDefaultComponent, LayoutAuthComponent, PageNotFoundComponent];
