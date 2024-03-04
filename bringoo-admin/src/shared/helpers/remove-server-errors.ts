import { AbstractControl, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

export function removeServerErrors(formGroup: UntypedFormGroup): void {
  for (const field of Object.keys(formGroup.controls)) {
    formGroup.markAllAsTouched();
    formGroup.updateValueAndValidity();
    const control: AbstractControl | UntypedFormControl | null | UntypedFormGroup = formGroup.get(field);
    if (control instanceof UntypedFormControl) {
      control.setErrors(null);
      control.updateValueAndValidity();
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof UntypedFormGroup) {
      removeServerErrors(control);
    }
  }
}
