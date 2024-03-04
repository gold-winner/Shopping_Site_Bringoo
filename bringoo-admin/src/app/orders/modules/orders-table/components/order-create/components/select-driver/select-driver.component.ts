import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CrudOrderService } from '../../../../../../../../shared/api/auth/crud-order.service';
import { CrudStaffService } from '../../../../../../../../shared/api/auth/crud-staff.service';
import { OrderJobTypeEnum, StaffEntity } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFilterFormComponent } from '../../../../../../../../shared/modules/crud/classes/dynamic-filter-form.component';
import { CrudColumn, EntityValue } from '../../../../../../../../shared/modules/crud/interfaces/crud-column';
import { CrudConfig } from '../../../../../../../../shared/modules/crud/interfaces/crud-config';
import { CrudFields } from '../../../../../../../../shared/modules/crud/types/crud-select.type';
import { SelectDriverFilterFormComponent } from './select-driver-filter-form/select-driver-filter-form.component';

@UntilDestroy()
@Component({
  selector: 'app-select-driver',
  templateUrl: './select-driver.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDriverComponent {
  @Input() openPanel: boolean = false;
  @Input() orderId: string = '';
  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() label: string = '';

  filterForm: Type<DynamicFilterFormComponent> = SelectDriverFilterFormComponent;

  fields: CrudFields<StaffEntity> = ['id', 'role'];

  join: string[] = ['settings||firstName,lastName,staffNumber'];
  staffChecked: string = '';

  config: CrudConfig = {
    title: 'Driver',
    plural: 'Drivers',
    single: 'Driver',
    isActionColumnVisible: false,
    patchUrlQueryFromFilterForm: false,
  };

  columns: CrudColumn<StaffEntity>[] = [
    {
      label: 'Name',
      isSortable: false,
      getField(item: StaffEntity): EntityValue {
        return `${item.settings?.firstName} ${item.settings?.lastName}`;
      },
      type: 'link',
      link(item: StaffEntity): string {
        return `/users/staff/details/${item.id}`;
      },
    },
    {
      label: 'Staff Number',
      isSortable: false,
      getField(item: StaffEntity): EntityValue {
        return item.settings?.staffNumber;
      },
      type: 'link',
      link(item: StaffEntity): string {
        return `/users/staff/details/${item.id}`;
      },
    },
    {
      label: 'Role',
      isSortable: false,
      getField(item: StaffEntity): EntityValue {
        return item.role;
      },
      type: 'text',
    },
  ];

  checkbox(id: any): void {
    this.staffChecked = id.length > 0 ? id[0] : '';
  }

  onSubmit(): void {
    if (this.staffChecked) {
      this.crudOrderService.setStaff({ orderId: this.orderId, jobType: OrderJobTypeEnum.DRIVE, staffId: this.staffChecked }).subscribe(
        () => {
          this.submit.emit(true);
          this.nzNotificationService.success('Set staff to order', 'Staff successfully changed');
        },
        () => this.submit.emit(false),
      );
    }
  }

  onCloseDrawer(): void {
    this.submit.emit(false);
  }

  constructor(
    public readonly service: CrudStaffService,
    private readonly crudOrderService: CrudOrderService,
    private readonly nzNotificationService: NzNotificationService,
  ) {}
}
