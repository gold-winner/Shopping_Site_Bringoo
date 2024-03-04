import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CommissionFeeScaleEnum, FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-commission-fee-category-filter-form',
  templateUrl: './store-commission-fee-category-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCommissionFeeCategoryFilterFormComponent extends DynamicFilterFormComponent {
  id: string = '';

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    category: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  beforeInit(): void {
    this.id = this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'];
  }

  mapSearch(filters: typeof this.form.value): FindInput {
    const findInput: FindInput = {};

    const $and: any[] = [
      { storeId: this.id },
      { commissionFeeScale: CommissionFeeScaleEnum.CATEGORY },
      ...this.createDefaultFilters(filters),
    ];

    if (filters.search) {
      $and.push({ $or: [{ 'productCategory.name_i18n': { $contL: filters.search } }] });
    }

    findInput.s = JSON.stringify({ $and });

    return findInput;
  }

  private createDefaultFilters({ category }: typeof this.form.value): any[] {
    const and: any[] = [];
    if (category) {
      and.push({ productCategoryCode: category });
    }

    return and;
  }
}
