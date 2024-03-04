import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

import { I18NInput } from '../../api/auth/data-contracts';
import { LANGUAGES_CONFIG } from '../../config/languages.config';
import { coerceBooleanProperty } from '../../helpers/coerce-boolean-property';

@UntilDestroy()
@Component({
  selector: 'app-multi-lang-input',
  templateUrl: './multi-lang-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiLangComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MultiLangComponent),
      multi: true,
    },
  ],
})
export class MultiLangComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string;
  @Input() type: 'text' | 'textarea' = 'text';
  @Input() rows: number = 2;

  @Input()
  set required(req: boolean | string) {
    const required: boolean = coerceBooleanProperty(req);
    if (this.isRequired !== required) {
      this.isRequired = required;
      this.buildForm();
    }
  }

  @Input()
  set disabled(disabled: boolean | string) {
    this.isDisabled = coerceBooleanProperty(disabled);
    for (const field of Object.keys(this.form.controls)) {
      const control: AbstractControl | UntypedFormControl | null | UntypedFormGroup = this.form.get(field);
      if (control instanceof UntypedFormControl) {
        disabled ? control.disable() : control.enable();
      }
    }
  }

  isDisabled: boolean = false;
  isRequired: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  form: UntypedFormGroup = this.fb.group({});
  langList = LANGUAGES_CONFIG;

  private defaultValues: I18NInput = { EN: '' };

  constructor(private readonly fb: UntypedFormBuilder) {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({});
    for (const lang of this.langList) {
      if (lang === 'EN' && this.isRequired) {
        this.form.addControl(lang, new UntypedFormControl(null, [Validators.required]));
      } else {
        this.form.addControl(lang, new UntypedFormControl(null, []));
      }
    }

    this.form.valueChanges.pipe(untilDestroyed(this), distinctUntilChanged()).subscribe((value: I18NInput) => {
      this.onFormChanges(value);
    });
  }

  private onFormChanges(value: I18NInput): void {
    if (this.form.invalid) {
      this.onChange(null);
    } else {
      if (this.type === 'textarea') this.onChange(this.deleteNullProperty(value));
      else this.onChange(value);
    }

    this.onTouched();
  }

  get value(): I18NInput {
    return this.form.value;
  }

  set value(value: I18NInput) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  registerOnChange(fn: (value: I18NInput) => void): void {
    this.onChange = fn;
    //this.onFormChanges(this.defaultValues);
  }

  writeValue(value: I18NInput): void {
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

  deleteNullProperty(value: I18NInput): I18NInput | null {
    const formValues: I18NInput = value;

    let ind: keyof typeof formValues;
    let count: number = LANGUAGES_CONFIG.length;
    for (ind in formValues) {
      if (value[ind] === null) count = count - 1;
    }

    return count === 0 ? null : formValues;
  }

  ngOnInit(): void {}
}
