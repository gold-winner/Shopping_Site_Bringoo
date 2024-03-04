import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import {
  FindInput,
  PushNotificationCodeEnum,
  PushNotificationGroupEnum,
  UserGroupEnum,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-manager-roles-filter-form',
  templateUrl: 'notification-management-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationManagementFilterFormComponent extends DynamicFilterFormComponent {
  private searchKeys: string[] = ['title_i18n', 'body_i18n'];

  userGroupList: string[] = Object.values(UserGroupEnum);
  notificationGroupList: string[] = Object.values(PushNotificationGroupEnum);
  notificationCodeList: string[] = Object.values(PushNotificationCodeEnum);

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    userGroup: new FormControl<UserGroupEnum | null>(null),
    notificationGroup: new FormControl<PushNotificationGroupEnum | null>(null),
    notificationCode: new FormControl<PushNotificationCodeEnum | null>(null),
  });

  mapSearch(filters: typeof this.form.value): FindInput {
    const str: string = !filters.search
      ? JSON.stringify({
          $and: [...this.createDefaultFilters(filters)],
        })
      : JSON.stringify({
          $and: [...this.createDefaultFilters(filters), { $or: this.createDefaultSearchFilter(filters.search, this.searchKeys) }],
        });
    return { s: str };
  }

  createDefaultFilters = ({ userGroup, notificationGroup, notificationCode }: typeof this.form.value): { [p: string]: any }[] => {
    const $and: { [p: string]: any }[] = [];

    if (userGroup) {
      $and.push({ userGroup });
    }

    if (notificationGroup) {
      $and.push({ notificationGroup });
    }

    if (notificationCode) {
      $and.push({ notificationCode });
    }

    return $and;
  };

  createDefaultSearchFilter = (search: string, searchKeys: string[]): { [p: string]: { $contL: string } }[] =>
    searchKeys.map((key: string) => ({ [key]: { $contL: search } }));
}
