import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { CrudOrderService } from '../../../../../../../../shared/api/auth/crud-order.service';
import {
  KeyPointCreateInput,
  KeyPointTypeEnum,
  OrderEntity,
  Pageable,
  RouteCreateInput,
  StaffRoleEnum,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from '../../../../../../../../shared/config/constants.config';
import { validateForm } from '../../../../../../../../shared/helpers/validate-form';
import { FilterSearch } from '../../../../../../../../shared/types/crud-filters.types';

@Component({
  selector: 'app-create-route-form',
  templateUrl: 'create-route-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRouteFormComponent {
  @Input() set create(input: Symbol | null) {
    if (!input) return;

    validateForm(this.form);

    if (this.form.valid) {
      this.beforeCreate(this.form.value);
    }
  }

  dateTimeFormat: string = DATE_TIME_FORMAT;
  dateFormat: string = DATE_FORMAT;
  timeFormat: string = TIME_FORMAT;

  @Output() createInput: EventEmitter<RouteCreateInput> = new EventEmitter<RouteCreateInput>();
  form!: UntypedFormGroup;

  staffRoles: StaffRoleEnum[] = [StaffRoleEnum.PICKER_DRIVER, StaffRoleEnum.DRIVER];

  customOrderSelectFilters: FilterSearch<OrderEntity> = {
    // @ts-ignore
    'keyPoint.id': { $isnull: true },
  };

  constructor(private readonly fb: UntypedFormBuilder, private readonly orderService: CrudOrderService) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      isActive: [true, [Validators.required]],
      code: [null, [Validators.required]],
      driverAssignedId: [null, [Validators.required]],
      dateTimeStart: [null, [Validators.required]],
      dateTimeEnd: [null, [Validators.required]],
      provideComment: [null, [Validators.max(500)]],
      orderIds: [[]],
      keyPoints: [[]],
    });
  }

  beforeCreate({ orderIds, ...input }: RouteCreateInput & { orderIds: string[] }): void {
    if (orderIds.length > 0) {
      this.orderService
        .find({
          filter: [`id||$in||${orderIds.join(',')}`],
          fields: 'id',
          join: ['orderDeliveryAddress||location'],
        })
        .pipe(map((result: Pageable & { items?: OrderEntity[] }): OrderEntity[] => result.items ?? []))
        .subscribe((orders: OrderEntity[]) => {
          const keyPoints: KeyPointCreateInput[] = orders.map(
            (order: OrderEntity): KeyPointCreateInput => {
              return {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                location: order.orderDeliveryAddress!.location!,
                orderId: order.id,
                pointType: KeyPointTypeEnum.DROP_OFF,
              };
            },
          );
          this.createInput.emit({
            ...input,
            keyPoints,
          });
        });
    } else {
      this.createInput.emit({ ...input });
    }
  }
}
