import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss'],
})
export class DropdownButtonComponent {
  @Input() defaultValue!: string;
  @Input() items: Array<any> = [];
  @Input() isDefault: boolean = true;
  @Input() radius: boolean = true;
  @Input() background: boolean = true;
  @Output() onClickMode = new EventEmitter<any>();
  @Output() onToggleLocation = new EventEmitter<boolean>();
  opened: boolean = false;
  selectedItem!: any;

  onSelect(id: string): void {
    this.selectedItem = this.items.find((x: any) => x.id === id);
    this.onClickMode.emit(this.selectedItem);
    this.opened = false;
  }

  onToggle(): void {
    this.opened = !this.opened;
    this.onToggleLocation.emit(this.opened);
  }
}
