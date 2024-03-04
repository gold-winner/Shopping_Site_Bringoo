import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput, PushNotificationCodeEnum, UserGroupEnum } from '../../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../../../../../shared/modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-customer-filter-form',
  templateUrl: 'initial-notifications-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialNotificationsFilterFormComponent extends DynamicFilterFormComponent {
  orderId: string = '';

  form = new FormGroup({
    search: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  beforeInit(): void {
    this.orderId = this.route.snapshot.params['id'];
  }

  mapSearch({ search }: typeof this.form.value): FindInput {
    const filter: string[] = [
      `data->>orderId||${CondOperator.EQUALS}||${this.orderId}`,
      `data->>code||${CondOperator.IN}||${PushNotificationCodeEnum.STAFF_ORDER_JOB_PICKER_CREATED},
      ${PushNotificationCodeEnum.STAFF_ORDER_JOB_RIDER_CREATED}`,
      `userGroup||${CondOperator.EQUALS}||${UserGroupEnum.Staff}`,
    ];

    if (search) {
      filter.push(`data->>firstName||${CondOperator.STARTS_LOW}||${search}`);
    }

    return {
      filter,
    };
  }
}
