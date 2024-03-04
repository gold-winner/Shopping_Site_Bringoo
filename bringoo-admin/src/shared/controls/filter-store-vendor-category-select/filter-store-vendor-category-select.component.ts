import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CrudVendorCategoryService } from '../../api/auth/crud-vendor-category.service';
import { CorporateEntity, VendorCategoryEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@Component({
  selector: 'app-filter-store-vendor-category-select',
  templateUrl: 'filter-store-vendor-category-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterStoreVendorCategorySelectComponent),
      multi: true,
    },
  ],
})
export class FilterStoreVendorCategorySelectComponent extends CustomControlComponent<string | string[]> {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() placeHolder: string = 'Store Corporate';
  @Input() label: string = 'Store Vendor Category filter';
  @Input() onlyActive: boolean = false;
  @Input() required: boolean = false;

  storeSelect: SelectOptions<VendorCategoryEntity> = {
    service: this.service,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: CorporateEntity): string {
      return item.name_i18n || '---';
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private service: CrudVendorCategoryService, protected readonly inj: Injector) {
    super(inj);
  }

  ngOnInit(): void {
    this.setFilter();
    super.ngOnInit();
  }

  setFilter(): void {
    if (this.onlyActive) {
      this.storeSelect = {
        ...this.storeSelect,
        filter: [['isActive', CondOperator.EQUALS, 'true'].join('||')],
      };
    }
  }
}
