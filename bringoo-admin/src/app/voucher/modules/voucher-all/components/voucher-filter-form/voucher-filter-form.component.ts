import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput, VoucherTypeEnum } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { ActiveShowStatusesType } from '../../../../../../shared/types/active-show-statuses.type';

@UntilDestroy()
@Component({
  selector: 'app-voucher-filter-form',
  templateUrl: './voucher-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoucherFilterFormComponent extends DynamicFilterFormComponent {
  dateFormat: string = DATE_FORMAT;
  voucherTypes: string[] = Object.values(VoucherTypeEnum);

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    isActive: new FormControl('Show ALL') as FormControl<ActiveShowStatusesType>,
    dateStart: new FormControl<string | null>(null),
    dateEnd: new FormControl<string | null>(null),
    voucherType: new FormControl<VoucherTypeEnum | null>(null),
  });

  mapSearch({ search, isActive, voucherType, dateStart, dateEnd }: typeof this.form.value): FindInput {
    this.formSubmit.emit({ search, isActive, voucherType } as FindInput);

    const s: any = { $and: [] };

    if (search) {
      s.$and.push({
        $or: [
          {
            code: { $contL: search },
          },
        ],
      });
    }

    if (dateStart) {
      s.$and.push({ create_date: { $gte: `${dateStart} 00:00:00` } });
    }

    if (dateEnd) {
      s.$and.push({ create_date: { $lte: `${dateEnd} 23:59:59` } });
    }

    if (isActive && isActive !== 'Show ALL') {
      s.$and.push({ isActive: isActive === 'Show Active' });
    }

    if (voucherType) {
      s.$and.push({ voucherType });
    }

    return { s: JSON.stringify(s), sort: ['create_date,DESC'] };
  }
}
