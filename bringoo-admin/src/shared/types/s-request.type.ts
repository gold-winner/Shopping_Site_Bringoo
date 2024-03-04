import { CondOperator } from '../modules/crud/enums/cond-operator';
import { EntityFields } from '../modules/crud/types/entity-fields.type';

export type SRequestType = {
  [p: string]: any | SAndRequest | SOrRequest | Condition;
};

export type SAndRequest = {
  $and: SRequestType[];
};

export type SOrRequest = {
  $or: SRequestType[];
};

export type Condition = {
  [p in CondOperator]: EntityFields;
};
