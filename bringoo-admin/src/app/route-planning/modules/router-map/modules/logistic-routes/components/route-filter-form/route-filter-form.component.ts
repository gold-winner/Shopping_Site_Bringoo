import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RoutesSearchInput, StaffRoleEnum } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@Component({
  selector: 'app-route-filter-form',
  templateUrl: 'route-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteFilterFormComponent extends DynamicFilterFormComponent<RoutesSearchInput> {
  driversRoles: StaffRoleEnum[] = [StaffRoleEnum.DRIVER, StaffRoleEnum.PICKER_DRIVER];

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    driverAssignedId: new FormControl<string | null>(null),
  });

  defaultFormValue: any = {
    driverAssignedId: null,
  };

  mapSearch({ driverAssignedId, search }: typeof this.form.value): RoutesSearchInput {
    return {
      ...(driverAssignedId && { driverAssignedId }),
      ...(search && { search }),
    };
  }
}
