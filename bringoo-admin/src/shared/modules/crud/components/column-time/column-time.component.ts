import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-column-time',
  templateUrl: './column-time.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnTimeComponent {
  @Input() set value(v: any) {
    if (v) {
      this.val = `1.01.1111 ${v}`;
    }
  }

  val: string | undefined;
}
