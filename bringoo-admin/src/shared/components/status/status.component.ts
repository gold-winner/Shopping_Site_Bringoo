import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent {
  @Input() set value(v: any) {
    this.val = v === undefined ? undefined : v === 'true' || v === true || v === 1 || v === '1' || v === 'TRUE' || v === 'YES';
  }

  @Input() trueText: string | undefined;
  @Input() falseText: string | undefined;
  val: boolean | undefined;
}
