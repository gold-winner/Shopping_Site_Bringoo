import { InputError } from '../../../api/auth/data-contracts';

export interface DynamicFormInputs<T = any> {
  value?: T | undefined;
  submit?: symbol | undefined;
  show?: symbol | undefined;
  errors?: InputError[];
  defaultFilters?: object;
}
