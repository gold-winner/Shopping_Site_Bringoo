import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthForgotPwdComponent } from './components/auth-forgot-pwd/auth-forgot-pwd.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthResetPwdComponent } from './components/auth-reset-pwd/auth-reset-pwd.component';
import { AuthSignupModule } from './components/auth-signup/auth-signup.module';
@NgModule({
  declarations: [AuthComponent, AuthLoginComponent, AuthForgotPwdComponent, AuthResetPwdComponent],
  imports: [SharedModule, RouterModule, CommonModule, AuthSignupModule],
  exports: [AuthComponent, RouterModule, AuthLoginComponent, AuthForgotPwdComponent, AuthResetPwdComponent, AuthSignupModule],
})
export class AuthModule {}
