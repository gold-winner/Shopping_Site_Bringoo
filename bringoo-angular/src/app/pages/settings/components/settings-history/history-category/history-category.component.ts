import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-settings-history-category',
  templateUrl: './history-category.component.html',
  styleUrls: ['./history-category.component.scss'],
})
export class SettingsHistoryCategoryComponent {
  @Input() option: string = 'alternative';
  @Input() category: string = 'review';
  @Output() onCategoryClick = new EventEmitter<string>();
}
