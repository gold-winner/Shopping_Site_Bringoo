import { Component, Input } from '@angular/core';

import { iconType } from '../icon/icon.type';
@Component({
  selector: 'ui-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  @Input() label: string | undefined;
  @Input() path: string | undefined;
  @Input() value: string | undefined;
  @Input() primaryIcon: iconType | undefined;
  @Input() secondaryIcon: iconType | undefined;
}
