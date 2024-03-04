import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { CrudRouteService } from '../../../../../../shared/api/auth/crud-route.service';
import {
  LangCodeEnum,
  RouteCreateInput,
  RouteDto,
  RouteEntity,
  RoutesSearchInput,
  RouteUpdateInput,
} from '../../../../../../shared/api/auth/data-contracts';
import { LogisticRouteService } from '../../../../../../shared/api/auth/logistic-route.service';
import { DynamicForm } from '../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { DynamicFormInputs } from '../../../../../../shared/modules/crud/interfaces/dynamic-form-inputs';
import { DynamicFormOutputs } from '../../../../../../shared/modules/crud/interfaces/dynamic-form-outputs';
import { UpdateRouteComponent } from '../../../router-map/modules/logistic-route-details/components/update-route/update-route.component';
import { BacklogService } from '../../services/backlog.service';
import { BacklogSearchType } from '../../type/backlog-search.type';

@Component({
  selector: 'app-backlog-page',
  templateUrl: 'backlog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['backlog-page.component.scss'],
})
export class BacklogPageComponent implements OnInit {
  routeUUIDs: string[] = [];
  routeIds: string[] = [];

  filterItems: BacklogSearchType = {
    search: null,
    staffIds: [],
    storeIds: [],
  };

  openPanel: 'updateRoute' | 'deleteRoute' | 'close' = 'close';

  filtersSubject: BehaviorSubject<RoutesSearchInput> = new BehaviorSubject<RoutesSearchInput>({});
  filters$: Observable<RoutesSearchInput> = this.filtersSubject.asObservable();

  routes$: Observable<RouteDto[]> = this.filters$.pipe(
    switchMap((input: RoutesSearchInput) => this.routeService.routes(input)),
    tap((items: RouteDto[]) => (this.routeIds = items.map(({ id }: RouteDto) => id))),
  );

  routeIsLoading$: Observable<boolean> = this.routeService.isLoading$;

  constructor(
    private readonly routeService: LogisticRouteService,
    private readonly crudRouteService: CrudRouteService,
    private readonly backlogService: BacklogService,
    private readonly notification: NzNotificationService,
    private readonly ref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.backlogService.createRoute$
      .pipe(
        tap(() => {
          this.routeUUIDs = [...this.backlogService.newRouteUUIDs];
        }),
      )
      .subscribe();
  }

  onCreateRoute({ input, orderIds, containerId }: { input: RouteCreateInput; orderIds: string[]; containerId: string }): void {
    this.crudRouteService.create(input).subscribe(() => {
      this.onUpdateRoutes();
      this.backlogService.deleteRouteWhichOnCreatePhase(containerId, orderIds);
    });
  }

  onClosePanel(): void {
    this.openPanel = 'close';
  }

  //delete route section
  deleteRouteId: string = '';
  deleteRouteName: string = '';

  onDeleteRouteDriverShow(id: string, name: string): void {
    this.deleteRouteId = id;
    this.deleteRouteName = name;
    this.openPanel = 'deleteRoute';
  }

  onDeleteRoute(): void {
    this.onClosePanel();
    this.crudRouteService.delete(this.deleteRouteId).subscribe(() => {
      this.notification.success('Delete Route', `${this.deleteRouteName} successfully deleted.`);
      this.deleteRouteId = '';
      this.deleteRouteName = '';
      this.onUpdateRoutes();
    });
  }

  //edit route section
  updateRouteId: string = '';

  updateRouteForm = {
    form: UpdateRouteComponent as Type<DynamicForm<RouteUpdateInput>>,
    routeName: '',

    formInputs: {
      value: null,
    } as DynamicFormInputs,

    formOutputs: {
      formSubmit: (value: RouteUpdateInput): void => this.updateRouteForm.update(value),
      formValueChanges: (value: RouteEntity): void => alert(value),
    } as DynamicFormOutputs,

    onShowForm: (id: string, name: string): void => {
      this.updateRouteForm.routeName = name;
      this.updateRouteId = id;
      this.openPanel = 'updateRoute';
      this.updateRouteForm.loadOne(id);
    },

    onButtonClick: (): void => {
      this.updateRouteForm.formInputs = { submit: Symbol('update') };
    },

    loadOne: (id: string): void => {
      this.crudRouteService.findOne(id, { lang: LangCodeEnum.ALL }).subscribe((value: RouteEntity) => {
        this.updateRouteForm.formInputs = { value, show: Symbol('true'), submit: undefined };
        this.ref.detectChanges();
      });
    },
    update: (value: RouteUpdateInput): void => {
      if (this.updateRouteId) {
        this.crudRouteService.update(this.updateRouteId, value).subscribe(() => {
          this.backlogService.updateRoute(this.updateRouteId);
          this.onClosePanel();
        });
      }
    },
  };

  onUpdateRoutes(): void {
    this.filtersSubject.next({ ...this.filtersSubject.getValue() });
  }

  onFilterUpdate(input: BacklogSearchType): void {
    const { isComplete, ...other } = this.filtersSubject.getValue();
    if ((input.isComplete || isComplete) && input.isComplete !== isComplete) {
      this.filtersSubject.next({
        ...other,
        ...(input.isComplete && { isComplete: input.isComplete }),
      });
    }

    this.filterItems = {
      search: input.search,
      staffIds: input.staffIds,
      storeIds: input.storeIds,
    };
  }
}
