import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { format, parse } from 'date-fns';

import { CustomControlComponent } from '../../classes/custom-control.component';
import { TIME_FORMAT } from '../../config/constants.config';

@Component({
  selector: 'app-time-control',
  templateUrl: 'time-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeControlComponent),
      multi: true,
    },
  ],
})
export class TimeControlComponent extends CustomControlComponent {
  @Input() timeFormat: string = TIME_FORMAT;
  @Input() minuteStep: number = 1;
  @Input() isRequired: boolean = false;
  @Input() disabledBeforeTime: string | null = null;
  defaultTime = new Date(0, 0, 0, 0, 0, 0);

  private defaultValue: string | null = null;
  private dirty: boolean = false;

  writeValue(val: string | Date): void {
    if (val) {
      if (val instanceof Date) {
        this.defaultValue = format(val, TIME_FORMAT);
        this.control.setValue(val);
      } else {
        this.defaultValue = val;
        this.control.setValue(parse(val, TIME_FORMAT, new Date()));
      }
    } else {
      this.control.setValue(null);
    }
    this.dirty = false;
  }

  nzDisabledHours = (): number[] => {
    if (this.disabledBeforeTime) {
      const house: number = Number(this.disabledBeforeTime.split(':')[0]);
      const disabledHours: number[] = [];

      for (let i: number = 0; i < house; i++) {
        disabledHours.push(i);
      }
      return disabledHours;
    }
    return [];
  };

  nzDisabledMinutes = (house: number): number[] => {
    if (this.disabledBeforeTime && house === Number(this.disabledBeforeTime.split(':')[0])) {
      const minute: number = Number(this.disabledBeforeTime.split(':')[1]);
      const disabledMinutes: number[] = [];

      for (let i: number = 0; i <= minute; i += this.minuteStep) {
        disabledMinutes.push(i);
      }
      return disabledMinutes;
    }

    return [];
  };

  ngOnInit(): void {
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe((time: Date | null) => {
      const value: string | null = time ? format(time, TIME_FORMAT) : null;
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
}
