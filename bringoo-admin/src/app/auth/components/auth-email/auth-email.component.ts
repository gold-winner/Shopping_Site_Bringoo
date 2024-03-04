import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-email',
  templateUrl: 'auth-email.component.html',
  styleUrls: ['auth-email.component.scss'],
  host: { class: 'd-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthEmailComponent {}
