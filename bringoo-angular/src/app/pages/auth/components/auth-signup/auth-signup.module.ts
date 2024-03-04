import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../../../shared/shared.module';
import { AuthSignupComponent } from './auth-signup.component';
import { AuthSignupStepItemComponent } from './components/auth-signup-step-item/auth-signup-step-item.component';
import { AuthSignupStepOneComponent } from './components/auth-signup-step-one/auth-signup-step-one.component';
import { AuthSignupStepThreeComponent } from './components/auth-signup-step-three/auth-signup-step-three.component';
import { AuthSignupStepTwoComponent } from './components/auth-signup-step-two/auth-signup-step-two.component';
@NgModule({
  declarations: [
    AuthSignupComponent,
    AuthSignupStepItemComponent,
    AuthSignupStepOneComponent,
    AuthSignupStepTwoComponent,
    AuthSignupStepThreeComponent,
  ],
  imports: [SharedModule, RouterModule, CommonModule],
  exports: [RouterModule, AuthSignupComponent],
})
export class AuthSignupModule {}
