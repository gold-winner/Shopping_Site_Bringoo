import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ui-settings-delete-address',
  templateUrl: './delete-address.component.html',
})
export class SettingsDeleteAddressComponent {
  @Output() onConfirmDelete = new EventEmitter<Event>();
  @Output() onCancel = new EventEmitter<Event>();
}
