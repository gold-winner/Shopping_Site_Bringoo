import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-icons',
  templateUrl: './icons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent {}
