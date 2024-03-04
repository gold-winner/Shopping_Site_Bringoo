import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FindInput, ProductTypeEnum } from '../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { ActiveShowStatusesType } from '../../../../../../shared/types/active-show-statuses.type';
import { DepositShowStatusesType } from '../../../../../../shared/types/deposit-show-statuses.type';
import { ImageShowStatusesType } from '../../../../../../shared/types/image-show-statuses.type';

@UntilDestroy()
@Component({
  selector: 'app-products-filter-form',
  templateUrl: 'products-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFilterFormComponent extends DynamicFilterFormComponent {
  depositFilter: DepositShowStatusesType[] = ['Show deposits', 'Hide deposits', 'Show ALL'];
  productTypes: string[] = Object.values(ProductTypeEnum);
  imagesStatuses: ImageShowStatusesType[] = ['Show All', 'With Images', 'Without Images'];

  form = new FormGroup({
    search: new FormControl<string | null>(null),
    onlyWithImages: new FormControl<ImageShowStatusesType>('Show All'),
    category: new FormControl<string | null>(null),
    subCategory: new FormControl<string | null>(null),
    weight: new FormControl<string | null>(null),
    orderBy: new FormControl<string>('$eq'),
    brand: new FormControl<string | null>(null),
    isDeposit: new FormControl<DepositShowStatusesType>('Show ALL'),
    tags: new FormControl<string[]>([]),
    isActive: new FormControl<ActiveShowStatusesType>('Show ALL'),
    productType: new FormControl<ProductTypeEnum | null>(null),
  });

  private searchKeys: string[] = ['name_i18n', 'productBrand.name_i18n', 'category.name_i18n', 'gtin', 'sku'];

  beforePatch(value: any): FindInput {
    return {
      ...value,
      ...(value?.tags && { tags: Array.isArray(value.tags) ? value.tags : [value.tags] }),
    };
  }

  mapSearch(filters: typeof this.form.value): FindInput {
    this.formSubmit.emit(filters as FindInput);
    const str: string = !filters.search
      ? JSON.stringify({
          $and: [...this.createDefaultFilters(filters)],
        })
      : JSON.stringify({
          $and: [
            ...this.createDefaultFilters(filters),
            {
              $or: [...this.createDefaultSearchFilter(filters.search, this.searchKeys), { ean: Number.parseInt(filters.search) }],
            },
          ],
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
    productType,
  }: typeof this.form.value): { [p: string]: any }[] => {
    const $and: { [p: string]: any }[] = [];

    if (onlyWithImages !== 'Show All') {
      $and.push({ noImage: onlyWithImages === 'Without Images' });
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

    if (productType) {
      $and.push({ productType });
    }

    return $and;
  };

  createDefaultSearchFilter = (search: string, searchKeys: string[]): { [p: string]: { $contL: string } }[] =>
    searchKeys.map((key: string) => ({ [key]: { $contL: search } }));
}
