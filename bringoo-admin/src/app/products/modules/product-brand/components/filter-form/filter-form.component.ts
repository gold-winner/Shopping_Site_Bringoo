import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';
import { ImageShowStatusesType } from '../../../../../../shared/types/image-show-statuses.type';

@UntilDestroy()
@Component({
  selector: 'app-product-brand-filter-form',
  templateUrl: './filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterFormComponent extends DynamicFilterFormComponent {
  imagesStatuses: ImageShowStatusesType[] = ['Show All', 'Without Images', 'With Images'];

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    image: new FormControl<ImageShowStatusesType>('Show All'),
    watermark: new FormControl<ImageShowStatusesType>('Show All'),
  });

  mapSearch({ search, watermark, image }: typeof this.form.value): FindInput {
    const $and: any[] = [];
    if (search) {
      $and.push({
        $or: [
          {
            name_i18n: { [CondOperator.CONTAINS_LOW]: search },
          },
          {
            code: { [CondOperator.CONTAINS_LOW]: search },
          },
        ],
      });
    }

    if (watermark !== 'Show All') {
      $and.push({
        watermarkImageUrl: { [watermark === 'With Images' ? CondOperator.NOT_NULL : CondOperator.IS_NULL]: true },
      });
    }

    if (image !== 'Show All') {
      $and.push({
        imageUrl: { [image === 'With Images' ? CondOperator.NOT_NULL : CondOperator.IS_NULL]: true },
      });
    }

    return { s: JSON.stringify({ $and }) };
  }
}
