import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-filter-form',
  templateUrl: './stores-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresFilterFormComponent extends DynamicFilterFormComponent {
  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    stores: new FormControl<string[]>([]) as FormControl<string[]>,
    softDelete: new FormControl(false) as FormControl<boolean>,
    storeRegionCode: new FormControl<string[]>([]),
    corporateCode: new FormControl<string[]>([]),
    storeBrandCode: new FormControl<string[]>([]),
    vendorTypeCode: new FormControl<string[]>([]),
  });

  beforeInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.form.patchValue({ stores: data['stores'] ?? [] });
    });
  }

  // eslint-disable-next-line complexity
  mapSearch({
    search,
    storeRegionCode,
    vendorTypeCode,
    storeBrandCode,
    corporateCode,
    softDelete,
    stores,
  }: typeof this.form.value): FindInput {
    const $and: any[] = [];

    if (storeRegionCode && storeRegionCode.length > 0) {
      $and.push({ storeRegionCode: { [CondOperator.IN]: [...storeRegionCode] } });
    }

    if (vendorTypeCode && vendorTypeCode.length > 0) {
      $and.push({ vendorTypeCode: { [CondOperator.IN]: [...vendorTypeCode] } });
    }

    if (storeBrandCode && storeBrandCode.length > 0) {
      $and.push({ storeBrandCode: { [CondOperator.IN]: [...storeBrandCode] } });
    }

    if (corporateCode && corporateCode.length > 0) {
      $and.push({ corporateCode: { [CondOperator.IN]: [...corporateCode] } });
    }

    if (search) {
      $and.push({ name_i18n: { $contL: search } });
    }

    if (stores && stores.length > 0) {
      $and.push({ id: { $in: stores } });
    }

    return { s: JSON.stringify({ $and }), softDelete };
  }
}
