import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-local-date',
  templateUrl: './local-date.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalDateComponent {
  @Input() date: number | string | Date = new Date();
  @Input() tz: string = 'UTC';
  @Input() format: string = 'short';
}
