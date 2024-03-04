import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-verification-status',
  templateUrl: 'verification-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationStatusComponent {
  @Input() isVerified: boolean = false;
}
