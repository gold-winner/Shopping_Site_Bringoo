import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { CrudStoreAddressService } from '../../../../../../../../shared/api/auth/crud-store-address.service';
import { StoreAddressEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CondOperator } from '../../../../../../../../shared/modules/crud/enums/cond-operator';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { SelectStoreAddressFilterFormComponent } from './select-store-address-filter-form/select-store-address-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-select-store-address',
  templateUrl: './select-store-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectStoreAddressComponent implements OnInit {
  @Input() openPanel: boolean = false;
  @Input() storeId: string = '';
  @Output() submit: EventEmitter<StoreAddressEntity | undefined> = new EventEmitter<StoreAddressEntity | undefined>();

  filterForm: Type<DynamicFilterFormComponent> = SelectStoreAddressFilterFormComponent;
  fields: CrudFields<StoreAddressEntity> = ['id', 'city', 'storeId', 'countryCode', 'streetName', 'streetNumber'];

  join: string[] = ['country||name_i18n'];
  customerChecked: string = '';

  config: CrudConfig = {
    title: 'Store address',
    plural: 'Store address',
    single: 'Store address',
    isActionColumnVisible: false,
    onCreate: (input: any): Observable<any> => {
      return this.service
        .find({ ...input, filter: [['storeId', CondOperator.CONTAINS_LOW, this.storeId.toLowerCase()].join('||')] })
        .pipe(take(1));
    },
    patchUrlQueryFromFilterForm: false,
  };

  columns: CrudColumn<StoreAddressEntity>[] = [
    {
      label: 'Street',
      isSortable: false,
      getField(item: StoreAddressEntity): EntityValue {
        return `${item.streetName} ${item.streetNumber}`;
      },
      type: 'text',
    },
    {
      label: 'City',
      isSortable: false,
      sortBy: 'city',
      getField(item: StoreAddressEntity): EntityValue {
        return item.city;
      },
      type: 'text',
    },
    {
      label: 'Country',
      isSortable: true,
      sortBy: 'countryCode',
      getField(item: StoreAddressEntity): EntityValue {
        return item.country?.name_i18n;
      },
      type: 'text',
    },
  ];

  checkbox(dd: any): void {
    this.customerChecked = dd.length > 0 ? dd[0] : '';
  }

  onSubmit(): void {
    if (this.customerChecked) {
      this.service
        .findOne(this.customerChecked)
        .pipe(
          untilDestroyed(this),
          tap((v: StoreAddressEntity) => this.submit.emit(v)),
        )
        .subscribe();
    }
  }

  ngOnInit(): void {}

  onCloseDrawer(): void {
    this.submit.emit();
  }

  constructor(public readonly service: CrudStoreAddressService) {}
}
