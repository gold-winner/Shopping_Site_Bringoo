import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { LogisticStaffDto } from '../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-staff-avatars',
  templateUrl: 'staff-avatars.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-flex' },
})
export class StaffAvatarsComponent {
  @Input() driver: LogisticStaffDto | undefined;
  @Input() picker: LogisticStaffDto | undefined;
}
