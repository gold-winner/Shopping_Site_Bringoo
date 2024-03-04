import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { AuthenticationService } from '../../../../../../shared/services/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-notification-my-unread-filter-form',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationMyUnreadFilterFormComponent extends DynamicFilterFormComponent {
  constructor(private readonly authenticationService: AuthenticationService) {
    super();
  }

  mapSearch(): FindInput {
    const s: any = { $and: [] };

    s.$and.push({
      markedAsReaded: false,
      userId: this.authenticationService.userIdSubject.value,
    });

    return { s: JSON.stringify(s), sort: ['create_date,DESC'] };
  }
}
