import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  @Input() primaryLabel: string = '';
  @Input() secondaryLabel: string = '';
  @Input() color: string = '';
  @Input() selected: string = 'first';
  @Output() onStateChange = new EventEmitter<string>();
  enabled: boolean = true;

  onChangeState(): void {
    if (this.selected === 'first') this.selected = 'second';
    else this.selected = 'first';
    this.onStateChange.emit(this.selected);
  }
}
