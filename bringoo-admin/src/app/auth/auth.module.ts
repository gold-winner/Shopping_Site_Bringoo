import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { authComponents } from './components';

@NgModule({
  bootstrap: [],
  imports: [SharedModule, AuthRoutingModule],
  declarations: [...authComponents],
})
export class AuthModule {}
