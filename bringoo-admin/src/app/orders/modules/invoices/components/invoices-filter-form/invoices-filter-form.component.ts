import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FindInput, OrderStatusEnum } from '../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT } from '../../../../../../shared/config/constants.config';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@Component({
  selector: 'app-invoices-filter-form',
  templateUrl: './invoices-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesFilterFormComponent extends DynamicFilterFormComponent {
  status: string = OrderStatusEnum.COMPLETE;
  dateFormat: string = DATE_FORMAT;

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    dateStart: new FormControl<string | null>(null),
    dateEnd: new FormControl<string | null>(null),
  });

  mapSearch({ search, dateStart, dateEnd }: typeof this.form.value): FindInput {
    this.formSubmit.emit({ search, dateStart, dateEnd } as FindInput);

    const s: any = { $and: [{ invoiceNumber: { $notnull: true } }] };

    if (search) {
      s.$and.push({
        $or: [
          {
            orderNumber: { $contL: search },
          },
          {
            invoiceNumber: { $contL: search },
          },
          {
            'customer.settings.firstName': { $contL: search },
          },
          {
            'customer.settings.lastName': { $contL: search },
          },
          {
            'store.name_i18n': { $contL: search },
          },
        ],
      });
    }

    if (dateStart) {
      s.$and.push({ deliveryDate: { $gte: `${dateStart} 00:00:00` } });
    }
    if (dateEnd) {
      s.$and.push({ deliveryDate: { $lte: `${dateEnd} 23:59:59` } });
    }

    return { s: JSON.stringify(s) };
  }
}
