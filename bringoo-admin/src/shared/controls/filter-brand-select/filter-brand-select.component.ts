import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CrudProductBrandService } from '../../api/auth/crud-product-brand.service';
import { ProductBrandEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-filter-brand-select',
  templateUrl: './filter-brand-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterBrandSelectComponent),
      multi: true,
    },
  ],
})
export class FilterBrandSelectComponent extends CustomControlComponent implements OnInit {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() label: string = 'Brand';
  @Input() placeHolder: string = 'Brand';

  brandSelect: SelectOptions<ProductBrandEntity> = {
    service: this.crudProductBrandService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: ProductBrandEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private crudProductBrandService: CrudProductBrandService, protected readonly inj: Injector) {
    super(inj);
  }
}
