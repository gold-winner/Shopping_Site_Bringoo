import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { RoutesSearchInput } from '../../../../../../../../shared/api/auth/data-contracts';
import { DynamicFormInputs } from '../../../../../../../../shared/modules/crud/interfaces/dynamic-form-inputs';
import { DynamicFormOutputs } from '../../../../../../../../shared/modules/crud/interfaces/dynamic-form-outputs';
import { AppearanceAnimations } from '../../../../animations/appearance.animations';
import { LogisticRoutesService } from '../../../../services/logistic-routes.service';
import { RouteFilterFormComponent } from '../route-filter-form/route-filter-form.component';

@Component({
  selector: 'app-routers-side-bar',
  templateUrl: 'routers-side-bar.component.html',
  styleUrls: ['routers-side-bar.component.scss', '../../../../shared-styles/orders-side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [...AppearanceAnimations()],
})
export class RoutersSideBarComponent implements OnInit {
  @Output() showRoute: EventEmitter<void> = new EventEmitter<void>();
  @Output() showCreateForm: EventEmitter<void> = new EventEmitter<void>();

  isExpand: boolean = false;
  isOpen: boolean = false;

  routerFilters!: UntypedFormGroup;
  isLoading$: Observable<boolean> = this.logisticRoutesService.isLoadingRoutes$;
  checkedMany: boolean = false;
  deleteMany: symbol | null = null;

  constructor(private readonly fb: UntypedFormBuilder, private readonly logisticRoutesService: LogisticRoutesService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.routerFilters = this.fb.group({
      storeId: [null],
      assignedRoute: [false],
    });
  }

  onChangeStatus(): void {
    this.isExpand = !this.isExpand;
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

  onDeleteMany(): void {
    this.deleteMany = Symbol('delete');
  }

  routeFilterForm = {
    form: RouteFilterFormComponent,

    formInputs: {
      value: null,
    } as DynamicFormInputs,

    filterFormOutputs: {
      formValueChanges: (value: RoutesSearchInput): void => this.routeFilterForm.filterUpdate(value),
    } as DynamicFormOutputs,

    filterUpdate: (filters: RoutesSearchInput): void => {
      this.logisticRoutesService.patchFilters(filters);
    },
  };

  onManyCheck(status: boolean): void {
    this.checkedMany = status;
  }
}
