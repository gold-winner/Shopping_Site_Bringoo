import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface IOption {
  id: string;
  label: string;
}

@Component({
  selector: 'ui-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent {
  @Input() option: IOption = <IOption>{};
  @Input() selected: boolean = false;
  @Output() optionSelect = new EventEmitter<string>();

  onSelect(typeId: string): void {
    this.optionSelect.emit(typeId);
  }
}
