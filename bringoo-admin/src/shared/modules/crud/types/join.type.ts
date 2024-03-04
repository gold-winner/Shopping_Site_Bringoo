import { EntityFields } from './entity-fields.type';

export type Join<T> =
  | {
      [K in keyof T]: T[K] extends EntityFields ? never : K;
    }[keyof T]
  | string;
