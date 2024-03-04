import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput, PushNotificationStatusEnum, UserGroupEnum } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-notification-all-filter-form',
  templateUrl: './notification-all-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationAllFilterFormComponent extends DynamicFilterFormComponent {
  userGroups: string[] = Object.values(UserGroupEnum);
  statuses: string[] = Object.values(PushNotificationStatusEnum);

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    isActiveOnly: new FormControl<'Yes' | 'No' | null>(null),
    userGroup: new FormControl<string | null>(null),
    status: new FormControl<string | null>(null),
  });

  mapSearch({ search, isActiveOnly, userGroup, status }: typeof this.form.value): FindInput {
    this.formSubmit.emit({
      search,
    } as FindInput);

    const s: any = { $and: [{ isCustom: true }] };

    if (search) {
      s.$and.push({
        $or: [
          {
            title: { $contL: search },
          },
          {
            body: { $contL: search },
          },
        ],
      });
    }

    if (typeof isActiveOnly === 'string') {
      s.$and.push({ isActiveOnly: isActiveOnly === 'Yes' });
    }

    if (userGroup) {
      s.$and.push({ userGroup });
    }

    if (status) {
      s.$and.push({ status });
    }

    return { s: JSON.stringify(s), sort: ['sendDate,DESC'] };
  }
}
