import { EntityFields } from './entity-fields.type';

export type Fields<T> = {
  [K in keyof T]: T[K] extends EntityFields ? K : never;
}[keyof T];
