import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { addDays, addHours, format, isBefore, parse } from 'date-fns';

import { CustomControlComponent } from '../../classes/custom-control.component';
import { DATE_FORMAT } from '../../config/constants.config';
import { defaultTimeZoneConst } from '../../const/default-time-zone.const';
import { disableDateBefore } from '../../helpers/disable-date-before';

@Component({
  selector: 'app-date-control',
  templateUrl: 'date-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateControlComponent extends CustomControlComponent {
  @Input() dateFormat: string = DATE_FORMAT;
  @Input() isRequired: boolean = false;
  @Input() showTime: boolean = false;
  @Input() utcOutput: boolean = false;

  @Input() _disableBefore!: Date | null;

  @Input() set disableBefore(date: string | null | undefined) {
    if (date) {
      this._disableBefore = parse(date, this.dateFormat, new Date());
      if (this.showTime) {
        this._disableBefore = addDays(this._disableBefore, -1);
      }
      if (isBefore(this.control.value, this._disableBefore)) {
        this.control.patchValue(this._disableBefore);
      }
    } else {
      this._disableBefore = null;
    }
  }

  @Input() defaultDate: Date | null = null;

  private defaultValue: string | null = null;
  private dirty: boolean = false;

  writeValue(val: string | Date): void {
    if (val) {
      if (val instanceof Date) {
        const date: Date = addHours(val, this.utcOutput ? defaultTimeZoneConst.fromUtc : 0);

        this.defaultValue = format(val, this.dateFormat);
        this.control.setValue(date);
      } else {
        const date: Date = addHours(parse(val, this.dateFormat, new Date()), this.utcOutput ? defaultTimeZoneConst.fromUtc : 0);

        this.defaultValue = val;
        this.control.setValue(date);
      }
    } else {
      this.control.setValue(null);
    }
    this.dirty = false;
  }

  ngOnInit(): void {
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe((date: Date | null) => {
      const value: string | null = date
        ? format(this.utcOutput ? addHours(date, defaultTimeZoneConst.toUtc) : date, this.dateFormat)
        : null;
      this.changeValueIfDirty(value);
    });
  }

  changeValueIfDirty(value: string | null): void {
    if (value !== this.defaultValue || this.dirty) {
      this.onChange(value);
    }

    if (value !== this.defaultValue && !this.dirty) {
      this.dirty = true;
    }
  }

  disabledDate = disableDateBefore;
}
