import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ArrayMaxLengthValidator(maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (Array.isArray(control.value) && control.value.length <= maxLength) {
      return null;
    }
    return { required: { valid: false } };
  };
}
