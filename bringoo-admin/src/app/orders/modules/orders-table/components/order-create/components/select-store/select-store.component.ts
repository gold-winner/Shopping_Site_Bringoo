import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';

import { CrudStoreService } from '../../../../../../../../shared/api/auth/crud-store.service';
import { StoreEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { StoreService } from '../services/store-service';

@UntilDestroy()
@Component({
  selector: 'app-select-store',
  templateUrl: './select-store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectStoreComponent {
  @Input() openPanel: boolean = false;
  @Output() submit: EventEmitter<StoreEntity | undefined> = new EventEmitter<StoreEntity | undefined>();

  fields: CrudFields<StoreEntity> = ['name_i18n'];

  join: string[] = ['settings||firstName,lastName,customerNumber'];
  customerChecked: string = '';

  config: CrudConfig = {
    title: 'Store',
    plural: 'Stores',
    single: 'Store',
    isActionColumnVisible: false,
    patchUrlQueryFromFilterForm: false,
  };

  columns: CrudColumn<StoreEntity>[] = [
    {
      label: 'Name',
      isSortable: false,
      getField(item: StoreEntity): EntityValue {
        return item.name_i18n;
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
        .findOne(this.customerChecked, { join: ['vendorType||name_i18n', 'openingHours'] })
        .pipe(
          untilDestroyed(this),
          tap((v: StoreEntity) => this.submit.emit(v)),
          tap((v: StoreEntity) => {
            this.storeIdService.storeId = v.id;
          }),
        )
        .subscribe();
    }
  }

  onCloseDrawer(): void {
    this.submit.emit();
  }

  constructor(public readonly service: CrudStoreService, private storeIdService: StoreService) {}
}
