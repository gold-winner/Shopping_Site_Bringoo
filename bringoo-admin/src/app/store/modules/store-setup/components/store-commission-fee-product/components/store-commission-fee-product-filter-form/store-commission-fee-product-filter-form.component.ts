import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CommissionFeeScaleEnum, FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { filters } from '../../../../../../../../shared/types/filters.type';

@UntilDestroy()
@Component({
  selector: 'app-store-commission-fee-product-filter-form',
  templateUrl: './store-commission-fee-product-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCommissionFeeProductFilterFormComponent extends DynamicFilterFormComponent {
  id: string = '';

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  beforeInit(): void {
    this.id = this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'];
  }

  mapSearch(filters: filters): FindInput {
    this.formSubmit.emit(filters);
    const findInput: FindInput = {};

    const $and: any[] = [{ storeId: this.id }, { commissionFeeScale: CommissionFeeScaleEnum.PRODUCT }];

    if (filters.search) {
      $and.push({ $or: [{ 'product.name_i18n': { $contL: filters.search } }] });
    }

    findInput.s = JSON.stringify({ $and });

    return findInput;
  }
}
