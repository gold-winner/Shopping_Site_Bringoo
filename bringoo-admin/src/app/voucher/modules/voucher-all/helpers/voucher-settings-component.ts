import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  template: '',
})
export abstract class VoucherSettingsComponent implements ControlValueAccessor, OnInit {
  form: UntypedFormGroup = new UntypedFormGroup({});

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  registerOnChange(fn: (data: any) => void): void {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: (data: any) => void): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_: UntypedFormControl): null | ValidationErrors {
    return this.form.valid ? null : { required: { valid: true } };
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
