import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-phone',
  templateUrl: 'auth-phone.component.html',
  styleUrls: ['auth-phone.component.scss'],
  host: { class: 'd-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPhoneComponent {}
