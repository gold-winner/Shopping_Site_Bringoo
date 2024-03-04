import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CrudProductCategoryService } from '../../api/auth/crud-product-category.service';
import { ProductCategoryEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-filter-category-select',
  templateUrl: './filter-category-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterCategorySelectComponent),
      multi: true,
    },
  ],
})
export class FilterCategorySelectComponent extends CustomControlComponent implements OnInit {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() label: string = 'Category';
  @Input() placeHolder: string = 'Category';
  @Input() excludeCodes: string[] = [];

  categorySelect!: SelectOptions<ProductCategoryEntity>;

  ngOnInit(): void {
    super.ngOnInit();

    this.categorySelect = {
      service: this.crudProductCategoryService,
      fields: ['name_i18n', 'code', 'vendorCategoryCode'],
      sort: ['name_i18n,ASC'],
      valueKey: 'code',
      ...(this.excludeCodes?.length > 0 && { filter: [`code||${CondOperator.NOT_IN}||${this.excludeCodes.join(',')}`] }),
      getLabel(item: ProductCategoryEntity): string {
        return `${item.name_i18n} (${item.vendorCategoryCode})`;
      },
      search(term: string): string[] {
        return [
          ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
          ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
          ['vendorCategoryCode', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ];
      },
    };
  }

  constructor(private crudProductCategoryService: CrudProductCategoryService, protected readonly inj: Injector) {
    super(inj);
  }
}
