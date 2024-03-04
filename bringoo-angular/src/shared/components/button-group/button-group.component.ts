import { Component, Input } from '@angular/core';

import { iconType } from '../icon/icon.type';
@Component({
  selector: 'ui-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
})
export class ButtonGroupComponent {
  @Input() primaryIcon?: iconType = undefined;
  @Input() secondaryIcon?: iconType = undefined;
}
