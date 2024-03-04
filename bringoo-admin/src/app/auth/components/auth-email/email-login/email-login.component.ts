import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ManagerSignInInput } from '../../../../../shared/api/auth/data-contracts';
import { validateForm } from '../../../../../shared/helpers/validate-form';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';
import { ToFormGroupType } from '../../../../../shared/types/to-form-group.type';
import { PushNotificationService } from '../../../../push-notification/services';

@Component({
  selector: 'app-email-login',
  templateUrl: 'email-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailLoginComponent {
  passwordVisible: boolean = false;
  form: FormGroup<ToFormGroupType<ManagerSignInInput>> = new FormGroup<ToFormGroupType<ManagerSignInInput>>({
    email: new FormControl(null, [Validators.required]),
    deviceId: new FormControl(null),
    password: new FormControl<ManagerSignInInput['password'] | null>(null, [Validators.required]),
  });

  constructor(private readonly service: AuthenticationService, private readonly pushNotificationService: PushNotificationService) {}

  onSubmit(): void {
    validateForm(this.form);

    if (this.form.valid) {
      const { email, password } = this.form.value as ManagerSignInInput;
      this.service.signIn(email, password, this.pushNotificationService.token);
    }
  }
}
