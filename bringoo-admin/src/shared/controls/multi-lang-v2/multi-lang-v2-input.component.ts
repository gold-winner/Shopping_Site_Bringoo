import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { I18NInput } from '../../api/auth/data-contracts';
import { coerceBooleanProperty } from '../../helpers/coerce-boolean-property';
import { validateForm } from '../../helpers/validate-form';
import { LanguagesService } from '../../services/languages.service';

@UntilDestroy()
@Component({
  selector: 'app-multi-lang-v2-input',
  templateUrl: './multi-lang-v2-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiLangV2InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MultiLangV2InputComponent),
      multi: true,
    },
  ],
})
export class MultiLangV2InputComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string;
  @Input() type: 'text' | 'textarea' | 'tags' = 'text';
  @Input() rows: number = 2;
  @Input() language: string = 'EN';
  @Input() isReadOnly: boolean = false;

  @Input()
  set required(req: boolean | string) {
    this.isRequired = coerceBooleanProperty(req);
  }

  langList: string[] = [];
  primaryLang: string = '';

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

  constructor(private readonly fb: UntypedFormBuilder, public readonly service: LanguagesService, protected readonly inj: Injector) {}

  ngOnInit(): void {
    this.loadLanguages();
  }

  ngAfterViewInit(): void {
    const control: NgControl = this.inj.get(NgControl);
    control.control?.statusChanges.pipe(distinctUntilChanged()).subscribe(() => {
      validateForm(this.form);
    });
  }

  loadLanguages(): void {
    if (this.service.languages.length === 0) {
      this.service.isLoading.pipe(filter((status: boolean) => !status)).subscribe(() => {
        this.langList = this.service.languages;
        this.primaryLang = this.service.primaryLang;
        this.buildForm();
      });
    } else {
      this.langList = this.service.languages;
      this.primaryLang = this.service.primaryLang;
      this.buildForm();
    }
  }

  private buildForm(): void {
    this.language = this.service.primaryLang;
    this.form = this.fb.group({});
    for (const lang of this.langList) {
      this.form.addControl(lang, new UntypedFormControl(null, this.isRequired ? [Validators.required] : undefined));
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
    this.form.patchValue(value);
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
  }

  writeValue(value: I18NInput): void {
    if (value) {
      if (this.service.languages.length === 0) {
        this.service.isLoading.pipe(filter((status: boolean) => !status)).subscribe(() => {
          this.value = value;
        });
      } else {
        this.value = value;
      }
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
    let count: number = this.langList.length;
    for (ind in formValues) {
      if (value[ind] === null) count = count - 1;
    }

    return count === 0 ? null : formValues;
  }
}
