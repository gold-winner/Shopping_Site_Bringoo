import { ChangeDetectionStrategy, Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CrudManagerRoleService } from '../../api/auth/crud-manager-role.service';
import { ManagerRoleEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { Pageable } from '../../interfaces/pageable';

@Component({
  selector: 'app-manager-type-account-radio',
  templateUrl: 'manager-type-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ManagerTypeAccountComponent),
      multi: true,
    },
  ],
})
export class ManagerTypeAccountComponent extends CustomControlComponent<string> {
  managerRoles: Observable<ManagerRoleEntity[]> = this.service
    .find({ fields: 'code' })
    .pipe(map((res: Pageable & { items?: ManagerRoleEntity[] }) => res.items ?? []));

  constructor(private readonly service: CrudManagerRoleService, protected readonly inj: Injector) {
    super(inj);
  }
}
