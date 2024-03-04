import { Params } from '@angular/router';

export type CrudColumnType =
  | 'text'
  | 'text[]'
  | 'boolean'
  | 'image'
  | 'float2decimalplaces'
  | 'date'
  | 'time'
  | 'link'
  | 'tags'
  | 'action'
  | 'price'
  | 'location';

export type CrudColumnDate = 'medium' | 'mediumDate' | 'mediumTime' | string;

export type EntityValue = any;

export interface CrudColumn<T> {
  label: string;
  isSortable: boolean;
  type: CrudColumnType;
  sortBy?: string;
  align?: 'left' | 'right' | 'center';
  fixedLeft?: boolean;
  fixedRight?: boolean;
  nzWidth?: `${number}px`;

  boolean?: {
    trueText?: string;
    falseText?: string;
  };
  dateFormat?: CrudColumnDate;

  getField(item: T): EntityValue;
  link?(item: T): string;
  getQueryParams?(item: T): Params;
}
