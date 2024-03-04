import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
