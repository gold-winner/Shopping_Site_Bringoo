import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-header-default',
  templateUrl: './def-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefHeaderComponent {}
