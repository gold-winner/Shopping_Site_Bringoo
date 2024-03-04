import { Component, EventEmitter, Input, Output } from '@angular/core';

import IItem from './item.interface';
@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() items: IItem[] = [];
  @Input() label: string | undefined;
  @Input() selectedItem: IItem | undefined;
  @Input() hasBorder: boolean = false;
  @Output() onSelect = new EventEmitter<IItem>();
  isDropdownOpened: boolean = false;

  onClick(): void {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  onSelectItem(id: number | string): void {
    this.selectedItem = this.items.find((x: IItem) => x.id === id);
    this.onSelect.emit(this.selectedItem);
    this.isDropdownOpened = false;
  }

  unsorted(): number {
    return 0;
  }
}
