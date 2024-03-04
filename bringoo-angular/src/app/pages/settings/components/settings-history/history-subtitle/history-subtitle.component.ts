import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-settings-history-subtitle',
  templateUrl: './history-subtitle.component.html',
  styleUrls: ['./history-subtitle.component.scss'],
})
export class SettingsHistorySubtitleComponent {
  @Input() option: 'alternative' | 'replacement' = 'alternative';
}
