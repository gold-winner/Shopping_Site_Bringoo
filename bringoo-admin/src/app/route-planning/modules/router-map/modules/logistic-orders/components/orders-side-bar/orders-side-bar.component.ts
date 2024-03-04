import { AnimationEvent } from '@angular/animations';
import { ChangeDetectorRef, Component, Type } from '@angular/core';

import { OrdersWithStaffInformationFilterInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { OrderService } from '../../../../../../../../shared/api/auth/order.service';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { DynamicFormInputs } from '../../../../../../../../shared/modules/crud/interfaces/dynamic-form-inputs';
import { DynamicFormOutputs } from '../../../../../../../../shared/modules/crud/interfaces/dynamic-form-outputs';
import { AppearanceAnimations } from '../../../../animations/appearance.animations';
import { LogisticOrdersService } from '../../../../services/logistic-orders.service';
import { RoutePlanningService } from '../../../../services/route-planning.service';
import { OrderFiltersComponent } from '../order-filters/order-filters.component';

@Component({
  selector: 'app-orders-side-bar',
  templateUrl: 'orders-side-bar.component.html',
  styleUrls: ['../../../../shared-styles/orders-side-bar.component.scss'],
  host: { class: 'd-block' },
  animations: [...AppearanceAnimations()],
})
export class OrdersSideBarComponent {
  isExpand: boolean = false;
  isOpen: boolean = false;

  showOnMap!: symbol;
  selectAll!: symbol;
  unSelectAll!: symbol;

  constructor(
    private readonly service: OrderService,
    public readonly routePlanningService: RoutePlanningService,
    private readonly logisticOrdersService: LogisticOrdersService,
    private readonly ref: ChangeDetectorRef,
  ) {}

  onChangeStatus(): void {
    this.isExpand = !this.isExpand;
    this.ref.detectChanges();
    if (!this.isExpand && this.routePlanningService.markersType === 'ORDERS') {
      this.routePlanningService.clearMarkers('ORDERS');
    }
  }

  onEndAnimation(event: AnimationEvent): void {
    if (event.toState === 'void') {
      this.isOpen = false;
      return;
    }
    if (event.fromState === 'void') {
      this.isOpen = true;
    }
  }

  orderFilterForm = {
    form: OrderFiltersComponent as Type<DynamicForm<Omit<OrdersWithStaffInformationFilterInput, 'page' | 'limit'>>>,

    formInputs: {
      value: null,
    } as DynamicFormInputs,

    filterFormOutputs: {
      formValueChanges: (value: OrdersWithStaffInformationFilterInput): void => this.orderFilterForm.filterUpdate(value),
    } as DynamicFormOutputs,

    filterUpdate: ({
      hasDriver,
      hasPicker,
      hasRoute,
      routeId,
      storeId,
      orderStatuses,
      deliveryDate,
    }: OrdersWithStaffInformationFilterInput): void => {
      const search: Partial<OrdersWithStaffInformationFilterInput> = {
        ...(typeof hasDriver === 'boolean' && { hasDriver }),
        ...(typeof hasPicker === 'boolean' && { hasPicker }),
        ...(typeof hasRoute === 'boolean' && { hasRoute }),
        ...(routeId && { routeId }),
        ...(storeId && { storeId }),
        ...(orderStatuses && { orderStatuses }),
        ...(deliveryDate && { deliveryDate }),
      };

      this.logisticOrdersService.patchFilters(search);
    },
  };

  onSelectAll(): void {
    this.selectAll = Symbol('selectAll');
  }

  onUnSelectAll(): void {
    this.unSelectAll = Symbol('unSelectAll');
  }

  onShowOnMap(): void {
    this.showOnMap = Symbol('showOnMap');
  }
}
