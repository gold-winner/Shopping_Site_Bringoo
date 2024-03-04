import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { iconType } from './icon.type';

@Component({
  selector: 'icon',
  template: ` <svg class="svg-icon">
    <use attr.xlink:href="assets/symbol-defs.svg#{{ name }}"></use>
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() name: iconType | undefined;
}
