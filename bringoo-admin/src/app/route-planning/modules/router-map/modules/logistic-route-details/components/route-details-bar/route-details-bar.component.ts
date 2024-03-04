import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit, Type } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';

import { CrudRouteService } from '../../../../../../../../shared/api/auth/crud-route.service';
import {
  KeyPointDto,
  LangCodeEnum,
  RouteDetailsDto,
  RouteEntity,
  RouteUpdateInput,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { LogisticRouteService } from '../../../../../../../../shared/api/auth/logistic-route.service';
import { isNonNull } from '../../../../../../../../shared/helpers/is-non-null.helper';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { DynamicFormInputs } from '../../../../../../../../shared/modules/crud/interfaces/dynamic-form-inputs';
import { DynamicFormOutputs } from '../../../../../../../../shared/modules/crud/interfaces/dynamic-form-outputs';
import { AppearanceAnimations } from '../../../../animations/appearance.animations';
import { LogisticKeyPointsService } from '../../../../services/logistic-key-points.service';
import { LogisticRoutesService } from '../../../../services/logistic-routes.service';
import { RoutePlanningService } from '../../../../services/route-planning.service';
import { UpdateRouteComponent } from '../update-route/update-route.component';

@UntilDestroy()
@Component({
  selector: 'app-route-details-bar',
  templateUrl: 'route-details-bar.component.html',
  styleUrls: ['route-details-bar.component.scss', '../../../../shared-styles/orders-side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [...AppearanceAnimations(350)],
})
export class RouteDetailsBarComponent implements OnInit {
  isExpand: BehaviorSubject<'close' | 'open'> = new BehaviorSubject<'close' | 'open'>('close');
  isExpand$: Observable<'close' | 'open'> = this.isExpand.asObservable();
  isOpen: boolean = false;

  isDisabledCreateButton$: Observable<boolean> = this.logisticRoutesService.activeRoute$.pipe(map((value: string | null) => !value));

  isManyChecked: boolean = false;

  driverId: string | null = null;

  route$: Observable<RouteDetailsDto | null> = this.logisticRoutesService.activeRoute$.pipe(
    switchMap(
      (routeId: string | null): Observable<RouteDetailsDto | null> => {
        if (routeId) {
          return this.routeService.details(routeId);
        }

        return of(null);
      },
    ),
    tap((data: RouteDetailsDto | null) => {
      this.driverId = data ? data.driver.id : null;
    }),
    shareReplay(1),
  );

  isDisabledAssignDriverButton$: Observable<boolean> = this.logisticKeyPointsService.keyPoints$.pipe(
    map((points: KeyPointDto[]) => {
      return points.length > 0
        ? !points.some(({ order, driver }: KeyPointDto) => Boolean(order?.id) && driver?.id !== this.driverId)
        : true;
    }),
  );

  isLoading$: Observable<boolean> = this.logisticKeyPointsService.isLoadingKeyPoint$;
  openAssignDriver: symbol | null = null;
  createRouteItem: symbol | null = null;
  deletePoints: symbol | null = null;

  showOnMap!: symbol;
  showSelected!: symbol;

  pointWithError$: Observable<string | null> = this.logisticKeyPointsService.pointWithError$;

  openAssignDriverForm: 'open' | 'close' = 'close';

  constructor(
    public readonly routeService: LogisticRouteService,
    private readonly logisticKeyPointsService: LogisticKeyPointsService,
    private readonly logisticRoutesService: LogisticRoutesService,
    private readonly crudRouteService: CrudRouteService,
    private readonly routePlanningService: RoutePlanningService,
  ) {}

  ngOnInit(): void {
    this.routesPanelClickObserver();
  }

  routesPanelClickObserver(): void {
    this.logisticRoutesService.activeRoute$
      .pipe(
        untilDestroyed(this),
        filter(isNonNull),
        tap(() => {
          this.onExpandPanel();
        }),
      )
      .subscribe();
  }

  onExpandPanel(): void {
    this.isExpand.next('open');
  }

  onCompressPanel(): void {
    this.isExpand.next('close');
    this.logisticRoutesService.setActiveRoute(null);
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

  onShowOnMap(): void {
    this.showOnMap = Symbol('showOnMap');
  }

  onShowSelected(): void {
    this.showSelected = Symbol('showSelected');
  }

  onCreateRouteItem(): void {
    this.createRouteItem = Symbol('createRouteItem');
  }

  onDeletePoints(): void {
    this.deletePoints = Symbol('deletePoints');
  }

  updateRouteId: string | null = null;
  openPanel: 'updateRoute' | null = null;
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

    onShowForm: (item: RouteDetailsDto): void => {
      this.openPanel = 'updateRoute';

      if (this.updateRouteForm.routeName && item.name) {
        this.updateRouteForm.routeName = item.name;
      }

      this.updateRouteId = item.id;
      this.updateRouteForm.loadOne(this.updateRouteId);
    },

    onButtonClick: (): void => {
      this.updateRouteForm.formInputs = { submit: Symbol('update') };
    },

    loadOne: (id: string): void => {
      this.crudRouteService
        .findOne(id, { lang: LangCodeEnum.ALL })
        .pipe(untilDestroyed(this), take(1))
        .subscribe((value: RouteEntity) => {
          this.updateRouteForm.formInputs = { value, show: Symbol('true'), submit: undefined };
        });
    },
    update: (value: RouteUpdateInput): void => {
      if (this.updateRouteId) {
        this.crudRouteService.update(this.updateRouteId, value).subscribe((value: RouteEntity) => {
          this.driverId = value.driverAssignedId ?? this.driverId;
          this.routePlanningService.reloadAll();
          this.onClosePanel();
        });
      }
    },
  };

  onClosePanel(): void {
    this.updateRouteId = null;
    this.openPanel = null;
  }

  onCheckedMany(status: boolean): void {
    this.isManyChecked = status;
  }

  onAssignDriver(): void {
    const routeId: string | null = this.logisticRoutesService.activeRouteId;
    if (!routeId) return;
    this.logisticKeyPointsService.setDriverForOrdersInRoute(routeId).subscribe(
      () => {
        this.onCloseAssignDriver();
        this.logisticKeyPointsService.reloadKeyPoints();
      },
      () => {
        this.onCloseAssignDriver();
      },
    );
  }

  onOpenAssignDriver(): void {
    this.openAssignDriverForm = 'open';
  }

  onCloseAssignDriver(): void {
    this.openAssignDriverForm = 'close';
  }
}
