import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

import { NutritionalDataCreateInput } from '../../api/auth/data-contracts';
import { DECIMAL_PATTERN_CONFIG } from '../../config/decimal-pattern.config';

@UntilDestroy()
@Component({
  selector: 'app-products-nutritional-data-control',
  templateUrl: './nutritional-data-control.component.html',
  styleUrls: ['nutritional-data-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NutritionalDataControlComponent),
      multi: true,
    },
  ],
})
export class NutritionalDataControlComponent implements ControlValueAccessor {
  decimalPattern: string = DECIMAL_PATTERN_CONFIG;
  isActiveControl: FormControl = new FormControl(false);
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  private buildForm(): void {
    this.form = this.fb.group({
      energyTotal: [0, [Validators.required]],
      calories: [0, [Validators.required]],
      fatTotal: [0, [Validators.required]],
      fatSaturates: [0, [Validators.required]],
      carbohydrateTotal: [0, [Validators.required]],
      carbohydrateSugars: [0, [Validators.required]],
      fibres: [0, [Validators.required]],
      protein: [0, [Validators.required]],
      salt: [0, [Validators.required]],
    });

    this.form.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged()).subscribe((value: NutritionalDataCreateInput) => {
      this.onFormChanges(value);
    });

    this.isActiveControl.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe(() => this.onFormChanges(this.form.value));
  }

  private onFormChanges(value: NutritionalDataCreateInput): void {
    if (this.isActiveControl.value === false || this.form.invalid) {
      this.onChange(null);
    } else {
      this.onChange(value);
    }

    this.onTouched();
  }

  set value(value: NutritionalDataCreateInput) {
    this.form.patchValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get value(): NutritionalDataCreateInput {
    return this.form.value;
  }

  registerOnChange(fn: (value: NutritionalDataCreateInput) => void): void {
    this.onChange = fn;
  }

  writeValue(value: NutritionalDataCreateInput): void {
    if (value) {
      this.isActiveControl.patchValue(true);
      this.value = value;
    }

    if (value === null) {
      this.isActiveControl.patchValue(false);
      this.form.reset({
        energyTotal: 0,
        calories: 0,
        fatTotal: 0,
        fatSaturates: 0,
        carbohydrateTotal: 0,
        carbohydrateSugars: 0,
        fibres: 0,
        protein: 0,
        salt: 0,
      });
    }
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
