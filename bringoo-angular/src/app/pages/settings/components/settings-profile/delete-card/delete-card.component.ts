import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ui-settings-delete-card',
  templateUrl: './delete-card.component.html',
})
export class SettingsDeleteCardComponent {
  @Output() onConfirmDelete = new EventEmitter<Event>();
  @Output() onCancel = new EventEmitter<Event>();
}
