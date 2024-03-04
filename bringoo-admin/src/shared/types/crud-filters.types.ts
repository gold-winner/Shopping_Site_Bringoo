import { CondOperator } from '../modules/crud/enums/cond-operator';

export type CrudFiltersListSelectSettingsType = {
  label: string;
  formControl: string;
  list: string[];
  type: 'multiple' | 'tags' | 'default';
  placeHolder: string;
};

export type contL = { $contL: string };

export type searchFilter = { [p: string]: contL | isNull };
export type filter = { [p in CondOperator]: defaultFilter };

export type multipleFilter = { $or: { [p: string]: contL | isNull | string | number | boolean }[] };
export type isNull = { $isnull: boolean };

export type defaultFilter = { [p: string]: contL | isNull | string | number | boolean | defaultFilter | filter | multipleFilter };

type filterIn = { [CondOperator.IN]: any[] };
type filterCond<T> = contL | isNull | string | number | boolean | defaultFilter | FilterSearch<T> | filter | filterIn;

type filterSearchByKeys<T> = {
  [key in keyof T]?: filterCond<T>;
};
type filterSearchOr<T> = {
  ['$or']: filterSearchByKeys<T>[] | filterCond<T>[];
};

export type FilterSearch<T = { id: string }> = filterSearchByKeys<T> | filterSearchOr<T>;
