import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { StoreEntity } from '../../../../../../../../shared/api/auth/data-contracts';

@Component({
  selector: 'app-performance-store-information',
  templateUrl: 'store-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .logo {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    `,
  ],
  host: { class: 'd-block' },
})
export class StoreInformationComponent {
  @Input() store!: StoreEntity;
}
