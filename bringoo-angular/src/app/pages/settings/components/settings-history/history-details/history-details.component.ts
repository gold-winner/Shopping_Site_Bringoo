import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-settings-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss'],
})
export class SettingsHistoryDetailsComponent {
  @Input() option: string = 'alternative';
  @Input() category: string = 'review';
}
