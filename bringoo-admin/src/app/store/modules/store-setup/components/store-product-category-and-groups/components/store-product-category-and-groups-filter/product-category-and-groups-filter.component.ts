import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { StoreCategorySettingsFilterType } from '../../../../../../../../shared/types/store-category-settings-filter.type';

@UntilDestroy()
@Component({
  selector: 'app-product-category-and-groups-filter',
  templateUrl: './product-category-and-groups-filter.component.html',
})
export class ProductCategoryAndGroupsFilterComponent implements OnInit {
  @Output('filters') filterValue: EventEmitter<StoreCategorySettingsFilterType> = new EventEmitter<StoreCategorySettingsFilterType>();

  form: UntypedFormGroup = this.fb.group({
    search: [null],
    vendorCategoryCode: [[]],
  });

  constructor(private readonly fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this), debounceTime(500), distinctUntilChanged())
      .subscribe((v: StoreCategorySettingsFilterType) => this.filterValue.emit(v));
  }
}
