import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CrudStaffService } from '../../api/auth/crud-staff.service';
import { StaffEntity, StaffRoleEnum } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';
import { FilterSearch } from '../../types/crud-filters.types';

@Component({
  selector: 'app-filter-staff-select',
  templateUrl: 'filter-staff-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterStaffSelectComponent),
      multi: true,
    },
  ],
})
export class FilterStaffSelectComponent extends CustomControlComponent<string | string[]> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Staff';
  @Input() label: string = 'Staff filter';
  @Input() onlyActive: boolean = false;
  @Input() required: boolean = false;
  @Input() staffRoles: StaffRoleEnum[] = [];

  selectOptions: SelectOptions<StaffEntity> = {
    service: this.service,
    fields: ['id'],
    join: ['settings||firstName,lastName,staffNumber'],
    sort: ['settings.firstName,ASC', 'settings.lastName,ASC'],
    ...(this.staffRoles.length > 0 && {
      filterForS: [{ role: { [CondOperator.IN]: this.staffRoles as string[] } }],
    }),
    valueKey: 'id',
    getLabel(item: StaffEntity): string {
      return item.settings?.firstName ? `${item.settings?.firstName} ${item.settings?.lastName} (${item.settings.staffNumber})` : '---';
    },
    searchForS(term: string): FilterSearch<StaffEntity>[] {
      const [firstName, lastName] = term.split(' ');

      return [
        {
          $or: [
            {
              ['settings.staffNumber']: { [CondOperator.CONTAINS_LOW]: term },
            },
            {
              ['settings.firstName']: { [CondOperator.CONTAINS_LOW]: firstName },
            },
            {
              ['settings.lastName']: { [CondOperator.CONTAINS_LOW]: firstName || lastName },
            },
          ],
        },
      ];
    },
  };

  constructor(private service: CrudStaffService, protected readonly inj: Injector) {
    super(inj);
  }

  ngOnInit(): void {
    if (this.staffRoles.length > 0) {
      this.selectOptions = {
        ...this.selectOptions,
        filterForS: [{ role: { [CondOperator.IN]: this.staffRoles as string[] } }],
      };
    }

    super.ngOnInit();
  }
}
