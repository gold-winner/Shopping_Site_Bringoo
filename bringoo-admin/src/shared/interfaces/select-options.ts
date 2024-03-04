import { Fields } from '../modules/crud/types/fields.type';
import { Join } from '../modules/crud/types/join.type';
import { FilterSearch } from '../types/crud-filters.types';
import { CrudApiService } from './crud-api-service';

export interface SelectOptions<T> {
  service: CrudApiService<T>;
  fields: Fields<Required<T>>[];
  valueKey: Fields<Required<T>>;
  /**
   * @deprecated
   */
  filter?: string[];
  filterForS?: FilterSearch<T>[];

  sort?: string[];
  join?: Join<Required<T>>[];

  getLabel(item: T): string;

  /**
   * @deprecated
   */
  search?(term: string): string[];
  searchForS?(term: string): FilterSearch<T>[];
}
