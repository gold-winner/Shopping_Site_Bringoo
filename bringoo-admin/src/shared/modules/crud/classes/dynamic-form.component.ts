import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { InputError } from '../../../api/auth/data-contracts';
import { removeServerErrors } from '../../../helpers/remove-server-errors';
import { setServerErrors } from '../../../helpers/set-server-errors';
import { validateForm } from '../../../helpers/validate-form';

@Component({ template: '' })
export abstract class DynamicForm<T = any> {
  form: UntypedFormGroup = new UntypedFormGroup({});
  defaultFormValue: Partial<T> = {};
  _defaultFilters: object = {};

  @Input() set defaultFilters(filters: object) {
    this._defaultFilters = filters;
    this.form.patchValue(filters);
  }

  @Input() set show(s: symbol | undefined) {
    if (s) {
      this.beforeShow();
    }
  }

  @Input() set submit(s: symbol | undefined) {
    if (s) {
      this.onSubmit();
    }
  }

  defaultValuesPatched: boolean = false;

  @Input() set value(value: T | undefined) {
    this.onSetValue(value);

    if (!this.form) {
      return;
    }
    if (!value) {
      this.form.reset(this.defaultFormValue);
    } else {
      if (this.defaultValuesPatched) {
        this.form.patchValue(this.beforePatch(value));
      } else {
        this.form.reset({
          ...this.form.value,
          ...this.beforePatch(value),
        });
        this.defaultValuesPatched = true;
      }

      this.afterPatchValue();
    }
  }

  beforePatch(value: T): T {
    return value;
  }

  beforeShow(): void {}

  afterPatchValue(): void {}

  @Input() set errors(errors: InputError[] | null) {
    if (!errors || errors.length === 0) {
      removeServerErrors(this.form);
    } else {
      setServerErrors(this.form, errors);
    }
  }

  beforeSubmit(value: T): T {
    return value;
  }

  onSetValue(value: any): any {
    return value;
  }

  onSubmit(): void {
    if (!this.form) {
      return;
    }

    validateForm(this.form);

    if (this.form.valid) {
      this.formSubmit.emit(this.beforeSubmit(this.form.value));
    }
  }

  @Output() formSubmit: EventEmitter<T> = new EventEmitter<T>();
  @Output() formValueChanges: EventEmitter<T> = new EventEmitter<T>();
}
