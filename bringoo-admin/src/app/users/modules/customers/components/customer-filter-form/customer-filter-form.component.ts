import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CustomerRoleEnum, FindInput } from '../../../../../../shared/api/auth/data-contracts';
import { UserSearchFilter } from '../../../../../../shared/helpers/user-search-filter';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-customer-filter-form',
  templateUrl: './customer-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFilterFormComponent extends DynamicFilterFormComponent {
  roles: (CustomerRoleEnum | 'All')[] = ['All', ...Object.values(CustomerRoleEnum)];

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    softDelete: new FormControl(false) as FormControl<boolean | 'true' | 'false'>,
    role: new FormControl(CustomerRoleEnum.CUSTOMER) as FormControl<CustomerRoleEnum | 'All'>,
    tags: new FormControl([]) as FormControl<string[]>,
    language: new FormControl<string | null>(null),
  });

  beforePatch(value: any): FindInput {
    return {
      ...value,
      ...(value.tags && { tags: Array.isArray(value.tags) ? value.tags : [value.tags] }),
    };
  }

  mapSearch({ search, role, softDelete, tags, language }: typeof this.form.value): FindInput {
    const showDeleted: boolean = softDelete === true || softDelete === 'true';

    const s: any = { $and: [] };
    if (role && role !== 'All') {
      s.$and.push({ role });
    }
    if (search) {
      s.$and.push({
        $or: [
          {
            email: { $contL: search },
          },
          ...UserSearchFilter(search, 'settings'),
        ],
      });
    }
    if (tags && tags.length > 0) {
      s.$and.push({ customerTags: { '$@>': [tags] } });
    }
    if (language) {
      s.$and.push({ 'settings.customerLanguageCode': language });
    }
    if (this._defaultFilters) {
      s.$and.push(this._defaultFilters);
    }

    return { s: JSON.stringify(s), sort: ['create_date,DESC'], softDelete: showDeleted };
  }
}
