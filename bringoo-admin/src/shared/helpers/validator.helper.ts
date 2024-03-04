import { Validators } from '@angular/forms';

export enum ValidatorKeyEnum {
  min = 'min',
  max = 'max',
  minLength = 'minLength',
  maxLength = 'maxLength',
  pattern = 'pattern',
  required = 'required',
}

const valitadorMap: Record<ValidatorKeyEnum, Function> = {
  [ValidatorKeyEnum.min]: Validators.min,
  [ValidatorKeyEnum.max]: Validators.max,
  [ValidatorKeyEnum.minLength]: Validators.minLength,
  [ValidatorKeyEnum.maxLength]: Validators.maxLength,
  [ValidatorKeyEnum.pattern]: Validators.pattern,
  [ValidatorKeyEnum.required]: Validators.required,
};

export function callValidatorByKey(key: ValidatorKeyEnum): Function {
  if (!valitadorMap[key]) {
    throw new Error(`Unknown validator ${key}`);
  }

  return valitadorMap[key];
}
