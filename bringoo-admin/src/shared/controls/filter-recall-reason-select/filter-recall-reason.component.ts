import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CrudProductRecallReasonService } from '../../api/auth/crud-product-recall-reason.service';
import { ProductRecallReasonEntity } from '../../api/auth/data-contracts';
import { CustomControlComponent } from '../../classes/custom-control.component';
import { SelectOptions } from '../../interfaces/select-options';
import { CondOperator } from '../../modules/crud/enums/cond-operator';

@UntilDestroy()
@Component({
  selector: 'app-filter-recall-reason-select',
  templateUrl: './filter-recall-reason-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterRecallReasonSelectComponent),
      multi: true,
    },
  ],
})
export class FilterRecallReasonSelectComponent extends CustomControlComponent implements OnInit {
  @Input() type: 'multiple' | 'tags' | 'default' = 'default';
  @Input() label: string = 'Recall Reason filter';
  @Input() placeHolder: string = 'Recall Reason';
  @Input() required: boolean = false;

  categorySelect: SelectOptions<ProductRecallReasonEntity> = {
    service: this.crudProductRecallReasonService,
    fields: ['name_i18n', 'code'],
    sort: ['name_i18n,ASC'],
    valueKey: 'code',
    getLabel(item: ProductRecallReasonEntity): string {
      return `${item.name_i18n} (${item.code})`;
    },
    search(term: string): string[] {
      return [
        ['name_i18n', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
        ['code', CondOperator.CONTAINS_LOW, term.toLowerCase()].join('||'),
      ];
    },
  };

  constructor(private crudProductRecallReasonService: CrudProductRecallReasonService, protected readonly inj: Injector) {
    super(inj);
  }
}
