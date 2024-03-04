import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../shared/config/constants.config';
import { coerceBooleanProperty } from '../../../../../shared/helpers/coerce-boolean-property';
import { DynamicFilterFormComponent } from '../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../shared/modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-consultation-request-filter-form',
  templateUrl: './consultation-request-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationRequestFilterFormComponent extends DynamicFilterFormComponent {
  dateTimeFormat: string = DATE_TIME_FORMAT;

  beforePatch(value: any): FindInput {
    value.isCallbackRequest = coerceBooleanProperty(value.isCallbackRequest);
    return value;
  }

  form = new FormGroup({
    search: new FormControl<null | string>(null),
    storeId: new FormControl<null | string>(null),
    submitDate: new FormControl<null | string>(null),
    isCallbackRequest: new FormControl<null | boolean>(null),
    CallbackRequestDate: new FormControl<null | string>(null),
  });

  mapSearch(filters: typeof this.form.value): FindInput {
    const $and: any[] = [];

    if (filters.search) {
      const [firstName, lastName] = filters.search.split(' ');
      $and.push({
        $or: [
          { firstName: { $contL: firstName } },
          { lastName: { $contL: lastName || firstName } },
          { 'product.name_i18n': { $contL: filters.search } },
        ],
      });
    }
    if (filters.storeId) {
      $and.push({ storeId: filters.storeId });
    }
    if (filters.isCallbackRequest) {
      $and.push({ callbackDateTime: { $notnull: true } });
    }
    if (filters.CallbackRequestDate) {
      $and.push({ callbackDateTime: { [CondOperator.EQUALS]: filters.CallbackRequestDate } });
    }

    if (filters.submitDate) {
      $and.push({ create_date: filters.submitDate });
    }

    return {
      s: JSON.stringify({ $and }),
      sort: ['create_date,DESC'],
    };
  }
}
