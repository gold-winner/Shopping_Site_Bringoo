import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-buttons',
  templateUrl: './buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsComponent {
  sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
  colors: Array<'primary' | 'secondary'> = ['primary', 'secondary'];
}
