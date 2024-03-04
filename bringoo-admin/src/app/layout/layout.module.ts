import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { LayoutAuthComponent } from './components/layout-auth/layout-auth.component';
import { LayoutDefaultComponent } from './components/layout-default/layout-default.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ActiveLinksPipe } from './pipes/active-links.pipe';

@NgModule({
  imports: [SharedModule],
  declarations: [LayoutDefaultComponent, LayoutAuthComponent, PageNotFoundComponent, ActiveLinksPipe, HeaderComponent],
  exports: [LayoutDefaultComponent, LayoutAuthComponent, PageNotFoundComponent, HeaderComponent],
})
export class LayoutModule {}
