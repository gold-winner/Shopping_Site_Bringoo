import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CrudProductSubcategoryService } from '../../api/auth/crud-product-subcategory.service';
import { ProductSubcategoryEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-filter-subcategory-select',
  templateUrl: './filter-subcategory-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterSubcategorySelectComponent),
      multi: true,
    },
  ],
})
export class FilterSubcategorySelectComponent extends CustomControlComponent implements OnInit {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() label: string = 'Subcategory';
  @Input() placeHolder: string = 'Subcategory';

  @Input() set categoryCode(categoryCode: string | null) {
    if (categoryCode) {
      this.control.patchValue(null);
      this.subCategorySelect = {
        ...this.subCategorySelect,
        filter: [['categoryCode', CondOperator.EQUALS, categoryCode || ' '].join('||')],
      };
    } else {
      this.subCategorySelect = {
        ...this.subCategorySelect,
        filter: [],
      };
    }
  }

  subCategorySelect: SelectOptions<ProductSubcategoryEntity> = {
    service: this.crudProductSubcategoryService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: ProductSubcategoryEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private crudProductSubcategoryService: CrudProductSubcategoryService, protected readonly inj: Injector) {
    super(inj);
  }
}
