import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { isAfter, parse } from 'date-fns';

import { TIME_FORMAT } from '../config/constants.config';

export function validateForm(formGroup: UntypedFormGroup): void {
  for (const field of Object.keys(formGroup.controls)) {
    formGroup.markAllAsTouched();
    formGroup.updateValueAndValidity();
    const control: AbstractControl | UntypedFormControl | null | UntypedFormGroup = formGroup.get(field);
    if (control instanceof UntypedFormControl) {
      control.markAsTouched({ onlySelf: true });
      control.updateValueAndValidity();
    } else if (control instanceof UntypedFormGroup) {
      validateForm(control);
    }
  }
}

export function requiredIfValidator(predicate: () => boolean): ValidatorFn {
  return (formControl: AbstractControl): ValidationErrors | null => {
    if (!formControl.parent) {
      return null;
    }
    if (predicate()) {
      return Validators.required(formControl);
    }
    return null;
  };
}

export function validationTime(predicate: () => string): ValidatorFn {
  return (formControl: AbstractControl): ValidationErrors | null => {
    const startTime: string = predicate();
    if (!startTime || !formControl.value) {
      return null;
    }
    if (isAfter(parse(startTime, TIME_FORMAT, new Date()), parse(formControl.value, TIME_FORMAT, new Date()))) {
      return { timeError: "Wrong time: The 'End Time' must be after the 'Start Time'." };
    }
    return null;
  };
}
