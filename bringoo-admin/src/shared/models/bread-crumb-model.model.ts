import { Params } from '@angular/router';

export interface BreadCrumbModel {
  title: string;
  path?: string;
  query?: Params;
}
