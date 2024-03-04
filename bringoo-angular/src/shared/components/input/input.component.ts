import { Component, EventEmitter, Input, Output } from '@angular/core';

import { iconType } from '../icon/icon.type';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() placeholder: string = '';
  @Input() leftIcon: boolean = true;
  @Input() icon?: iconType = undefined;
  @Input() img?: string = undefined;
  @Input() label?: string = undefined;
  @Input() value?: string = undefined;
  @Input() description?: string = undefined;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  @Input() error: boolean = false;
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() required: boolean = false;
  @Input() centered: boolean = false;
  @Input() length: number = 30;
  @Output() onClick = new EventEmitter<Event>();
  @Output() valueChange = new EventEmitter<string>();

  onChange(e: Event): void {
    this.value = (e.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }
}
