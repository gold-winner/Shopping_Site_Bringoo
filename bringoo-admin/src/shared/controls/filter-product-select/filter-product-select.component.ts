import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CrudProductService } from '../../api/auth/crud-product.service';
import { ProductEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-filter-product-select',
  templateUrl: './filter-product-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterProductSelectComponent),
      multi: true,
    },
  ],
})
export class FilterProductSelectComponent extends CustomControlComponent implements OnInit {
  @Input() required: boolean = true;
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() label: string = 'Product filter';
  @Input() placeHolder: string = 'Product';

  productSelect: SelectOptions<ProductEntity> = {
    service: this.crudProductService,
    fields: ['name_i18n', 'code', 'id', 'ean'],
    valueKey: 'id',
    getLabel(item: ProductEntity): string {
      return `${item?.name_i18n ? `${item?.name_i18n} (${item?.ean})` : '---'}`;
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private crudProductService: CrudProductService, protected readonly inj: Injector) {
    super(inj);
  }
}
