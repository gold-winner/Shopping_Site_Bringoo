import { FormGroup } from '@angular/forms';

export function RemoveNotDirtyValues<T>(value: T, form: FormGroup): T {
  const formValues: T = value;
  let ind: keyof typeof formValues & string;
  for (ind in formValues) {
    if (value[ind] === null || (!value[ind] && (value[ind] as any) !== 0) || !form.controls[ind]?.dirty) delete formValues[ind];
  }

  return formValues;
}
