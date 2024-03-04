import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CrudColumnDate } from '../../interfaces/crud-column';

@Component({
  selector: 'app-column-date',
  templateUrl: './column-date.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnDateComponent {
  @Input() set value(v: any) {
    if (v) {
      this.val = `${v}`;
    }
  }

  private _type: CrudColumnDate = 'mediumDate';
  @Input() set dateType(value: CrudColumnDate) {
    if (value) {
      this._type = value;
    }
  }

  get dateType(): CrudColumnDate {
    return this._type;
  }

  val: string | undefined;
}
