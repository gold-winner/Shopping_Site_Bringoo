import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateIf(controlName: string, value: any = true): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.parent?.get(controlName)?.value === value && !control.value) {
      return { error: true, value: 16 };
    }
    return null;
  };
}
