import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-store-product-category-out-of-stock-time-filter-form',
  templateUrl: './out-of-stock-time-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductCategoryOutOfStockTimeFilterFormComponent extends DynamicFilterFormComponent {
  storeId: string = '';

  form = new FormGroup({
    category: new FormControl<string | null>(null),
  });

  constructor(private readonly route: ActivatedRoute) {
    super();
  }

  beforeInit(): void {
    this.storeId = this.route.parent?.parent?.snapshot.params['id'] ?? this.route.snapshot.params['id'];
  }

  mapSearch(filters: typeof this.form.value): FindInput {
    const findInput: FindInput = {};
    const $and: any[] = [{ storeId: this.storeId }, ...this.createDefaultFilters(filters)];
    findInput.s = JSON.stringify({ $and });
    return findInput;
  }

  private createDefaultFilters({ category }: typeof this.form.value): any[] {
    const $and: any[] = [];

    if (category) {
      $and.push({ productCategoryCode: category });
    }

    return $and;
  }
}
