import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['../styles/shared-auth-styles.scss'],
  host: { class: 'd-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
