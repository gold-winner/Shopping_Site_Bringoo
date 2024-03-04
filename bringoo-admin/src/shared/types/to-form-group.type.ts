import { FormControl, FormGroup } from '@angular/forms';

export type ToFormGroupType<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Array<infer Item>
      ? FormControl<Item[] | null>
      : FormGroup<ToFormGroupType<T[K]>> | FormControl<T[K] | null>
    : FormControl<T[K] | null>;
};
