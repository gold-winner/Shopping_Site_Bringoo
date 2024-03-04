import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-jsonb-one-to-many-input',
  templateUrl: './jsonb-one-to-many-input.component.html',
  styleUrls: ['./jsonb-one-to-many-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JsonbOneToManyInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => JsonbOneToManyInputComponent),
      multi: true,
    },
  ],
})
export class JsonbOneToManyInputComponent implements ControlValueAccessor, OnInit {
  _keysList: string[] = [];

  @Input() set keysList(value: string[]) {
    this._keysList = value;

    if (this._keysList.length > 0) {
      for (const key of this._keysList) {
        this.form.addControl(key, new UntypedFormControl(null, []));
      }

      this.onIndexChange(0);
    }
  }

  get keysList(): string[] {
    return this._keysList;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  form: UntypedFormGroup = this.fb.group({});
  currentKey: string = '';

  constructor(private readonly fb: UntypedFormBuilder) {
    this.buildForm();
  }

  onIndexChange(index: number): void {
    this.currentKey = this.keysList[index];
  }

  private buildForm(): void {
    this.form = this.fb.group({});

    this.form.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged()).subscribe((value: any) => {
      this.onFormChanges(value);
    });
  }

  private onFormChanges(value: any): void {
    if (this.form.invalid) {
      this.onChange(null);
    } else {
      this.onChange(value);
    }

    this.onTouched();
  }

  get value(): any {
    return this.form.value;
  }

  set value(value: any) {
    value = {
      // eslint-disable-next-line unicorn/prefer-object-from-entries
      ...this.keysList.reduce((acc: any, i: string) => {
        acc[i] = null;
        return acc;
      }, {}),
      ...value,
    };

    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
    //this.onFormChanges(this.defaultValues);
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset({});
    }
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_: UntypedFormControl): null | ValidationErrors {
    return this.form.valid ? null : { required: { valid: false } };
  }

  ngOnInit(): void {}
}
