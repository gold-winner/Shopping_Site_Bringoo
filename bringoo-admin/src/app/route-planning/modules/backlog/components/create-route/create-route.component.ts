import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { isAfter, isBefore, parse } from 'date-fns';

import {
  KeyPointCreateInput,
  KeyPointTypeEnum,
  OrdersWithStaffInformationDto,
  RouteCreateInput,
  RouteDetailsDto,
} from '../../../../../../shared/api/auth/data-contracts';
import { DATE_TIME_FORMAT } from '../../../../../../shared/config/constants.config';
import { arrayMove } from '../../../../../../shared/helpers/move-in-array.helper';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { DynamicFormInputs } from '../../../../../../shared/modules/crud/interfaces/dynamic-form-inputs';
import { DynamicFormOutputs } from '../../../../../../shared/modules/crud/interfaces/dynamic-form-outputs';
import { CreateKeyPointComponent } from '../../../router-map/modules/logistic-route-details/components/create-key-point/create-key-point.component';
import { BacklogContainersEnum } from '../../enums/backlog-containers.enum';
import { BacklogService } from '../../services/backlog.service';
import { DropCreateRouteType } from '../../type/drop-create-route.type';
import { CreateRouteFormComponent } from '../create-route-form/create-route-form.component';

@Component({
  selector: 'app-create-route',
  templateUrl: 'create-route.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class CreateRouteComponent {
  @Input() title!: string;
  dateTimeStart!: string;
  dateTimeEnd!: string;
  data!: Partial<RouteCreateInput>;
  totals: Pick<RouteDetailsDto, 'totalBreaks' | 'totalRefuel' | 'totalPickUp' | 'totalDropOff' | 'totalPoints'> = {
    totalBreaks: 0,
    totalRefuel: 0,
    totalPickUp: 0,
    totalDropOff: 0,
    totalPoints: 0,
  };

  @Output() onCreateRouteData: EventEmitter<{ input: RouteCreateInput; orderIds: string[]; containerId: string }> = new EventEmitter<{
    input: RouteCreateInput;
    orderIds: string[];
    containerId: string;
  }>();

  active: boolean = true;

  @Input() containerId: string = BacklogContainersEnum.create_route;
  @Input() connectedToContainers: string[] = [];

  ordersAndKeyPoints: DropCreateRouteType[] = [];

  constructor(private readonly backlogService: BacklogService, private readonly ref: ChangeDetectorRef) {}

  onListDropped(event: CdkDragDrop<DropCreateRouteType[], DropCreateRouteType>): void {
    if (event.previousContainer.id !== this.containerId) {
      const itemData: DropCreateRouteType = event.item.data;
      let data: DropCreateRouteType[] = [...event.container.data, itemData];

      if (data.length > 1) {
        data = arrayMove(data, data.length - 1, event.currentIndex);
      }

      let pointType: KeyPointTypeEnum = KeyPointTypeEnum.DROP_OFF;

      if ('orderNumber' in itemData) {
        this.backlogService.addOrderToExclude(itemData.orderId);
        this.updateStartEndDateTime(itemData);
      } else {
        pointType = itemData.pointType;
      }

      this.updateTotals(pointType, 'add');
      this.ordersAndKeyPoints = [...data];
    } else {
      this.ordersAndKeyPoints = arrayMove(this.ordersAndKeyPoints, event.previousIndex, event.currentIndex);
    }
  }

  updateStartEndDateTime(itemData: OrdersWithStaffInformationDto): void {
    const date: string = itemData.deliveryDateTime.split(' ')[0];

    const dateTimeStart: string = `${date} ${itemData.startTime}`;
    const dateTimeEnd: string = `${date} ${itemData.endTime}`;

    if (!this.dateTimeStart || !this.dateTimeEnd) {
      this.dateTimeStart = dateTimeStart;
      this.dateTimeEnd = dateTimeEnd;
    } else {
      if (isBefore(parse(dateTimeStart, DATE_TIME_FORMAT, new Date()), parse(this.dateTimeStart, DATE_TIME_FORMAT, new Date()))) {
        this.dateTimeStart = dateTimeStart;
      }
      if (isAfter(parse(dateTimeEnd, DATE_TIME_FORMAT, new Date()), parse(this.dateTimeEnd, DATE_TIME_FORMAT, new Date()))) {
        this.dateTimeEnd = dateTimeEnd;
      }
    }
  }

  openDeleteRouteModal: 'show' | 'hide' = 'hide';

  showDeleteRoutePanel(event: MouseEvent): void {
    event.stopPropagation();
    this.openDeleteRouteModal = 'show';
  }

  hideDeleteRoutePanel(): void {
    this.openDeleteRouteModal = 'hide';
  }

  onDeleteRoute(): void {
    const orderIds: string[] = (this.ordersAndKeyPoints.filter(
      (value: DropCreateRouteType) => 'orderId' in value,
    ) as OrdersWithStaffInformationDto[]).map(({ orderId }: OrdersWithStaffInformationDto) => orderId);

    this.backlogService.deleteRouteWhichOnCreatePhase(this.containerId, orderIds);
  }

  // create route path
  openCreateFormModal: 'show' | 'hide' = 'hide';
  onShowCreateRouteForm(event: MouseEvent): void {
    event.stopPropagation();
    this.openCreateFormModal = 'show';
    this.routeCreateForm.formInputs = {
      value: {
        name: this.title,
        code: this.title,
        dateTimeStart: this.dateTimeStart,
        dateTimeEnd: this.dateTimeEnd,
        ...(this.data && { ...this.data }),
      },
      show: Symbol('true'),
    };
  }

  onHideCreateRouteForm(): void {
    this.openCreateFormModal = 'hide';
  }

  onCreateRouteClick(): void {
    this.routeCreateForm.formInputs = { submit: Symbol('true') };
  }

  routeCreateForm: {
    form: Type<DynamicForm<RouteCreateInput>>;
    formInputs: DynamicFormInputs;
    formOutputs: DynamicFormOutputs;
  } = {
    form: CreateRouteFormComponent as Type<DynamicForm<RouteCreateInput>>,

    formInputs: {
      value: null,
    },

    formOutputs: {
      formSubmit: (value: RouteCreateInput): void => this.onCreateRoute(value),
      formValueChanges: (value: any): void => alert(value),
    } as DynamicFormOutputs,
  };

  onCreateRoute(value: RouteCreateInput): void {
    const input: RouteCreateInput = {
      ...value,
      ...(this.ordersAndKeyPoints && {
        keyPoints: this.ordersAndKeyPoints.map(
          (data: OrdersWithStaffInformationDto | KeyPointCreateInput): KeyPointCreateInput => {
            if ('pointType' in data) {
              return data;
            } else {
              const { orderId, location } = data;

              return {
                pointType: KeyPointTypeEnum.DROP_OFF,
                orderId,
                location,
              };
            }
          },
        ),
      }),
    };

    const orderIds: string[] = (this.ordersAndKeyPoints.filter(
      (value: DropCreateRouteType) => 'orderId' in value,
    ) as OrdersWithStaffInformationDto[]).map(({ orderId }: OrdersWithStaffInformationDto) => orderId);

    this.onCreateRouteData.emit({ input, orderIds, containerId: this.containerId });

    this.openCreateFormModal = 'hide';
    this.title = value.name;
    this.data = value;
  }

  onRemoveKeyPointFormRoute({ orderId, index, pointType }: { orderId?: string; index: number; pointType: KeyPointTypeEnum }): void {
    if (orderId) {
      this.backlogService.removeOrderFromExclude(orderId);
    }
    this.updateTotals(pointType, 'delete');
    this.ordersAndKeyPoints.splice(index, 1);
  }

  //create route point
  openCreatePointModal: 'show' | 'hide' = 'hide';

  keyPointCreateForm: {
    form: Type<DynamicForm<KeyPointCreateInput>>;
    formInputs: DynamicFormInputs & { hideDropPointCreation?: boolean };
    formOutputs: DynamicFormOutputs;
    onHideDrawer: () => void;
    onSubmit: () => void;
    onShow: () => void;
  } = {
    form: CreateKeyPointComponent as Type<DynamicForm<KeyPointCreateInput>>,

    formInputs: {
      value: null,
      hideDropPointCreation: true,
    },

    formOutputs: {
      formSubmit: (value: KeyPointCreateInput): void => {
        this.keyPointCreateForm.formInputs = { show: undefined, submit: undefined };
        this.keyPointCreateForm.onHideDrawer();
        this.ordersAndKeyPoints = [...this.ordersAndKeyPoints, value];
        this.updateTotals(value.pointType, 'add');
        this.ref.detectChanges();
      },
      formValueChanges: (value: any): void => alert(value),
    } as DynamicFormOutputs,

    onHideDrawer: (): void => {
      this.openCreatePointModal = 'hide';
    },
    onSubmit: (): void => {
      this.keyPointCreateForm.formInputs = { submit: Symbol('true'), show: undefined };
    },
    onShow: (): void => {
      this.openCreatePointModal = 'show';
      this.keyPointCreateForm.formInputs = { show: Symbol('true'), submit: undefined, hideDropPointCreation: true };
    },
  };

  updateTotals(pointType: KeyPointTypeEnum, action: 'add' | 'delete'): void {
    const incDec: number = action === 'add' ? 1 : -1;
    const details: typeof this.totals = this.totals;

    switch (pointType) {
      case KeyPointTypeEnum.PICK_UP: {
        details.totalPickUp = details.totalPickUp + incDec;
        break;
      }
      case KeyPointTypeEnum.DROP_OFF: {
        details.totalDropOff = details.totalDropOff + incDec;
        break;
      }
      case KeyPointTypeEnum.MOBILITY_REFUEL: {
        details.totalRefuel = details.totalRefuel + incDec;
        break;
      }
      case KeyPointTypeEnum.BREAK_POINT: {
        details.totalBreaks = details.totalBreaks + incDec;
        break;
      }
    }
    details.totalPoints = details.totalPoints + incDec;

    this.totals = { ...details };
  }
}
