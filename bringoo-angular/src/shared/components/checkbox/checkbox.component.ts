import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Output() changeStatus = new EventEmitter<boolean>();
  selected: boolean = false;

  onSelect(): void {
    this.selected = !this.selected;
    this.changeStatus.emit(this.selected);
  }
}
