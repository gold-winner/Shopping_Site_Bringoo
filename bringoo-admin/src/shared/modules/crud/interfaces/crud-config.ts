import { Observable } from 'rxjs';

import { CrudActions } from './crud-actions';

export interface CrudConfig {
  title: string;
  subTitle?: string;
  single: string;
  plural: string;
  formWidth?: number | string;
  formBundleWidth?: number | string;
  isDeleteButtonVisible?: boolean;
  isDetailButtonVisible?: boolean;
  isEditButtonVisible?: boolean;
  isEditSubmitButtonVisible?: boolean;
  isCreateButtonVisible?: boolean;
  isActionColumnVisible?: boolean;
  isShowDefaultActions?: boolean;
  actionsList?: CrudActions[];
  isDragged?: boolean;
  nzScrollX?: `${number}px` | 'auto';
  useTableHeightCalculation?: boolean;
  fixedActionColumn?: boolean;
  fixedCheckboxColumn?: boolean;
  showReloadButton?: boolean;
  patchUrlQueryFromFilterForm?: boolean;

  onCreate?(input: any): Observable<any> | undefined;
}
