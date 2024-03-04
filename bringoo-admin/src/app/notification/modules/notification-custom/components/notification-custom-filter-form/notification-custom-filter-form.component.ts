import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput, PushNotificationCustomStatusEnum, UserGroupEnum } from '../../../../../../shared/api/auth/data-contracts';
import { UserSearchFilter } from '../../../../../../shared/helpers/user-search-filter';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-notification-custom-filter-form',
  templateUrl: './notification-custom-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCustomFilterFormComponent extends DynamicFilterFormComponent {
  userGroups: UserGroupEnum[] = Object.values(UserGroupEnum);
  statuses: PushNotificationCustomStatusEnum[] = Object.values(PushNotificationCustomStatusEnum);

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    userGroup: new FormControl<UserGroupEnum | null>(null),
    status: new FormControl<PushNotificationCustomStatusEnum | null>(null),
  });

  mapSearch({ search, userGroup, status }: typeof this.form.value): FindInput {
    this.formSubmit.emit({
      search,
    } as FindInput);

    const s: any = { $and: [] };

    if (search) {
      s.$and.push({
        $or: [
          {
            title: { $contL: search },
          },
          {
            body: { $contL: search },
          },
          ...UserSearchFilter(search, 'managerCreator.settings'),
        ],
      });
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
