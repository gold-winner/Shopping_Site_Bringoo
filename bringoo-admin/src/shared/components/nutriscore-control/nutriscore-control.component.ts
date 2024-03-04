import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

import { NutriScoreEnum } from '../../api/auth/data-contracts';

@UntilDestroy()
@Component({
  selector: 'app-products-nutriscore-control',
  templateUrl: './nutriscore-control.component.html',
  styleUrls: ['nutriscore-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NutriscoreControlComponent),
      multi: true,
    },
  ],
})
export class NutriscoreControlComponent implements ControlValueAccessor {
  formControl: FormControl = new FormControl(NutriScoreEnum.UNKNOWN, []);
  nutriTypes: string[] = Object.keys(NutriScoreEnum);

  constructor() {
    this.subscribe();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  private subscribe(): void {
    this.formControl.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged()).subscribe((value: NutriScoreEnum) => {
      this.onControlValueChanges(value);
    });
  }

  private onControlValueChanges(value: NutriScoreEnum): void {
    if (this.formControl.invalid) {
      this.onChange(null);
    } else {
      this.onChange(value);
    }

    this.onTouched();
  }

  set value(value: NutriScoreEnum) {
    this.formControl.patchValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get value(): NutriScoreEnum {
    return this.formControl.value;
  }

  registerOnChange(fn: (value: NutriScoreEnum) => void): void {
    this.onChange = fn;
  }

  writeValue(value: NutriScoreEnum): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.formControl.reset(NutriScoreEnum.UNKNOWN);
    }
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
