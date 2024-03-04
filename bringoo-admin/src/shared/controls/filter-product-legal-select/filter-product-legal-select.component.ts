import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CrudProductLegalService } from '../../api/auth/crud-product-legal.service';
import { ProductLegalEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';
import { FilterSearch } from '../../types/crud-filters.types';

@Component({
  selector: 'app-filter-product-legal-select',
  templateUrl: 'filter-product-legal-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterProductLegalSelectComponent),
      multi: true,
    },
  ],
})
export class FilterProductLegalSelectComponent extends CustomControlComponent<string | string[]> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Product legal';
  @Input() label: string = 'Product Legal';
  @Input() onlyActive: boolean = false;
  @Input() required: boolean = false;

  selectOptions: SelectOptions<ProductLegalEntity> = {
    service: this.service,
    fields: ['id', 'name_i18n', 'code'],
    valueKey: 'code',
    getLabel(item: ProductLegalEntity): string {
      return ((item.name_i18n as unknown) as string) ?? item.code ?? '---';
    },
    searchForS(term: string): FilterSearch<ProductLegalEntity>[] {
      return [
        {
          $or: [
            {
              ['name_i18n']: { [CondOperator.CONTAINS_LOW]: term },
            },
            {
              ['name_i18n']: { [CondOperator.CONTAINS_LOW]: term },
            },
          ],
        },
      ];
    },
  };

  constructor(private service: CrudProductLegalService, protected readonly inj: Injector) {
    super(inj);
  }
}
