import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ArrayMinLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (Array.isArray(control.value) && control.value.length >= minLength) {
      return null;
    }
    return { required: { valid: false } };
  };
}
