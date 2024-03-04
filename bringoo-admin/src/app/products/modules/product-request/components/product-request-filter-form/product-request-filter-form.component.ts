import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../../shared/modules/crud/enums/cond-operator';
import { ActiveShowStatusesType } from '../../../../../../shared/types/active-show-statuses.type';
import { DepositShowStatusesType } from '../../../../../../shared/types/deposit-show-statuses.type';
import { ImageShowStatusesType } from '../../../../../../shared/types/image-show-statuses.type';

@UntilDestroy()
@Component({
  selector: 'app-product-request-form',
  templateUrl: 'product-request-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRequestFilterFormComponent extends DynamicFilterFormComponent {
  depositFilter: DepositShowStatusesType[] = ['Show deposits', 'Hide deposits', 'Show ALL'];
  imagesStatuses: ImageShowStatusesType[] = ['Show All', 'With Images', 'Without Images'];

  private searchKeys: string[] = ['name_i18n', 'productBrand.name_i18n', 'category.name_i18n'];

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    onlyWithImages: new FormControl<ImageShowStatusesType>('Show All'),
    category: new FormControl<string | null>(null),
    subCategory: new FormControl<string | null>(null),
    brand: new FormControl<string | null>(null),
    isDeposit: new FormControl<DepositShowStatusesType>('Show ALL'),
    weight: new FormControl<number | null>(null),
    orderBy: new FormControl('$eq') as FormControl<string>,
    tags: new FormControl([]) as FormControl<string[]>,
    isActive: new FormControl<ActiveShowStatusesType>('Show ALL') as FormControl<ActiveShowStatusesType>,
  });

  beforePatch(value: any): FindInput {
    return {
      ...value,
      ...(value.tags && { tags: Array.isArray(value.tags) ? value.tags : [value.tags] }),
    };
  }

  mapSearch(filters: typeof this.form.value): FindInput {
    const str: string = !filters.search
      ? JSON.stringify({
          $and: [...this.createDefaultFilters(filters)],
        })
      : JSON.stringify({
          $and: [...this.createDefaultFilters(filters), { $or: this.createDefaultSearchFilter(filters.search, this.searchKeys) }],
        });
    return { s: str };
  }

  // eslint-disable-next-line complexity
  createDefaultFilters = ({
    onlyWithImages,
    category,
    subCategory,
    brand,
    isDeposit,
    weight,
    orderBy,
    tags,
    isActive,
  }: typeof this.form.value): { [p: string]: any }[] => {
    const $and: { [p: string]: any }[] = [];

    if (onlyWithImages !== 'Show All') {
      $and.push({ imageUrls: onlyWithImages === 'Without Images' ? { [CondOperator.IS_NULL]: true } : { [CondOperator.NOT_NULL]: true } });
    }
    if (category) {
      $and.push({ productCategoryCode: category });
    }
    if (subCategory) {
      $and.push({ productSubcategoryCode: subCategory });
    }
    if (weight && orderBy) {
      $and.push({ weight: { [orderBy]: weight } });
    }
    if (brand) {
      $and.push({ productBrandCode: brand });
    }
    if (isDeposit !== 'Show ALL') {
      $and.push({ depositId: isDeposit === 'Hide deposits' ? { $isnull: true } : { $notnull: true } });
    }
    if (tags && tags.length > 0) {
      $and.push({ $and: tags.map((value: string) => ({ tags_i18n: { $contL: value } })) });
    }
    if (isActive && isActive !== 'Show ALL') {
      $and.push({ isActive: isActive === 'Show Active' });
    }

    return $and;
  };

  createDefaultSearchFilter = (search: string, searchKeys: string[]): { [p: string]: { $contL: string } }[] =>
    searchKeys.map((key: string) => ({ [key]: { $contL: search } }));
}
