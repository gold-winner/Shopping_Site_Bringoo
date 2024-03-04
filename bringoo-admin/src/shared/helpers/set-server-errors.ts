import { UntypedFormGroup } from '@angular/forms';

import { InputError } from '../api/auth/data-contracts';

export function setServerErrors(formGroup: UntypedFormGroup, errors: InputError[]): void {
  for (const error of errors) {
    const [controlName, ...fields] = error.property.split('.');
    if (fields.length === 0) {
      formGroup.get(controlName)?.setErrors({ server: error.message });
    } else {
      const nestedError: InputError = { property: fields.join('.'), message: error.message };
      setServerErrors(formGroup.get(fields) as UntypedFormGroup, [nestedError]);
    }
  }
}
