import { Fields } from './fields.type';

export type CrudFields<T> = Fields<Required<T>>[];
