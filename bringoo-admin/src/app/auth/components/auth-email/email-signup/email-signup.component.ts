import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ManagerSignInInput } from '../../../../../shared/api/auth/data-contracts';
import { validateForm } from '../../../../../shared/helpers/validate-form';
import { AuthenticationService } from '../../../../../shared/services/authentication.service';
import { PushNotificationService } from '../../../../push-notification/services';

@Component({
  selector: 'app-email-signup',
  templateUrl: 'email-signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailSignupComponent {
  passwordVisible: boolean = false;
  form: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
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
