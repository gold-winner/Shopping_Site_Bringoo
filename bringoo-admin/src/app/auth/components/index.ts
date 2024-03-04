import { NgModule } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
import { AuthEmailComponent } from './auth-email/auth-email.component';
import { EmailLoginComponent } from './auth-email/email-login/email-login.component';
import { EmailSignupComponent } from './auth-email/email-signup/email-signup.component';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { AuthPhoneComponent } from './auth-phone/auth-phone.component';
import { AuthTypesComponent } from './auth-types/auth-types.component';

export const authComponents: Required<NgModule>['declarations'] = [
  AuthTypesComponent,
  AuthPhoneComponent,
  AuthEmailComponent,
  AuthHeaderComponent,
  AuthComponent,
  EmailLoginComponent,
  EmailSignupComponent,
];
