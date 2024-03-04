import { CdkDragDrop, CdkDragExit } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CrudKeyPointService } from '../../../../../../../../shared/api/auth/crud-key-point.service';
import {
  KeyPointChangeOrderInput,
  KeyPointCreateInput,
  KeyPointDto,
  KeyPointEntity,
  KeyPointTypeEnum,
  KeyPointUpdateInput,
  LangCodeEnum,
  RouteChangeOrderInput,
  RouteEntity,
} from '../../../../../../../../shared/api/auth/data-contracts';
import { LogisticRouteItemService } from '../../../../../../../../shared/api/auth/logistic-route-item.service';
import { arrayGroupMove, arrayMove } from '../../../../../../../../shared/helpers/move-in-array.helper';
import { DynamicForm } from '../../../../../../../../shared/modules/crud/classes/dynamic-form.component';
import { DynamicFormInputs } from '../../../../../../../../shared/modules/crud/interfaces/dynamic-form-inputs';
import { DynamicFormOutputs } from '../../../../../../../../shared/modules/crud/interfaces/dynamic-form-outputs';
import { ContainerIdEnum } from '../../../../enum/container-id.enum';
import { LogisticKeyPointsService } from '../../../../services/logistic-key-points.service';
import { LogisticRoutesService } from '../../../../services/logistic-routes.service';
import { RoutePlanningService } from '../../../../services/route-planning.service';
import { CreateKeyPointComponent } from '../create-key-point/create-key-point.component';
import { UpdateKeyPointComponent } from '../update-key-point/update-key-point.component';

@Component({
  selector: 'app-route-details-drop-zone',
  templateUrl: 'route-details-drop-zone.component.html',
  styleUrls: ['route-details-drop-zone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteDetailsDropZoneComponent {
  keyPoints$: Observable<KeyPointDto[]> = this.logisticKeyPointsService.keyPoints$.pipe(
    tap((items: KeyPointDto[]) => {
      this.itemsLength = items.length;
      this.checkedKeyPoints.clear();
      this.onCheckedMany.emit(false);
      if (this.routePlanningService.markersType === null || this.routePlanningService.markersType === 'KEY_POINTS') {
        this.createMarkers();
      }
    }),
  );

  itemsLength: number = 0;

  isLoading$: Observable<boolean> = this.logisticKeyPointsService.isLoadingKeyPoint$;

  @Input() errorOrderNumber: string | null = null;

  @Input() set showOnMap(input: symbol) {
    if (input) {
      if (this.routePlanningService.markersType !== 'KEY_POINTS') {
        this.createMarkers();
      } else {
        this.routePlanningService.showAllMarkers();
      }
    }
  }

  @Input() set showSelected(input: symbol) {
    if (input) {
      if (this.routePlanningService.markersType !== 'KEY_POINTS') {
        this.createMarkers(true);
      } else {
        this.routePlanningService.showMarkersIds(this.checkedKeyPoints);
      }
    }
  }

  @Input() set onCreateRouteItem(input: symbol | null) {
    if (input) {
      this.createRouteItem.onShowForm();
    }
  }

  @Input() set deletePoints(input: symbol | null) {
    if (input) {
      this.onShowDeleteModal();
    }
  }

  @Output() onCheckedMany: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() changeOrder: EventEmitter<RouteChangeOrderInput> = new EventEmitter<RouteChangeOrderInput>();

  isDragGroup: boolean = false;
  checkedKeyPoints: Set<string> = new Set<string>();
  ids: string[] = [];

  containerId: string = ContainerIdEnum.KEY_POINTS;
  connectTo$: Observable<string[]> = this.logisticRoutesService.routesContainerIds$;
  isDragToOtherRoute: boolean = false;

  constructor(
    private readonly routePlanningService: RoutePlanningService,
    private readonly logisticRoutesService: LogisticRoutesService,
    private readonly logisticKeyPointsService: LogisticKeyPointsService,
    private readonly notification: NzNotificationService,
    public readonly crudKeyPointService: CrudKeyPointService,
    public readonly routeItemService: LogisticRouteItemService,
    private readonly detectorRef: ChangeDetectorRef,
  ) {
    this.watchOnDeleteKPFromMap();
    this.watchOnUpdateKPFromMap();
  }

  watchOnDeleteKPFromMap(): void {
    this.logisticKeyPointsService.delete$.subscribe((id: string) => {
      this.onShowDeleteModal(id);
      this.detectorRef.markForCheck();
    });
  }

  watchOnUpdateKPFromMap(): void {
    this.logisticKeyPointsService.update$.subscribe((keyPoint: KeyPointDto) => {
      this.onUpdate(keyPoint);
    });
  }

  onUpdate(keyPoint: KeyPointDto): void {
    this.updateKeyPoint.onShowForm(keyPoint);
  }

  onDragStart(id: string): void {
    if (this.checkedKeyPoints.has(id)) {
      this.isDragGroup = true;
    }
  }

  onDragEnd(): void {
    if (this.isDragToOtherRoute) {
      this.isDragToOtherRoute = false;
      this.isDragGroup = false;
    }
  }

  changeContainer(data: CdkDragExit): void {
    const previousContainerId: string = data.container.id;
    this.isDragToOtherRoute = previousContainerId === this.containerId;
  }

  onKeyPointCheck(status: boolean, id: string): void {
    this.checkedKeyPoints[status ? 'add' : 'delete'](id);
    this.onCheckedMany.emit(this.checkedKeyPoints.size > 0);
  }

  onChangeOrder(event: CdkDragDrop<KeyPointDto[]>): void {
    if (event.currentIndex === event.previousIndex) return;
    let sortedIds: string[];
    const ids: string[] = this.logisticKeyPointsService.ids;

    if (this.isDragGroup) {
      const indexes: number[] = ids
        .map((id: string, index: number) => (this.checkedKeyPoints.has(id) ? index : null))
        .filter((value: number | null) => value !== null) as number[];

      sortedIds = arrayGroupMove([...ids], new Set(indexes), event.currentIndex);

      this.checkedKeyPoints.clear();
    } else {
      if (event.currentIndex === event.previousIndex) {
        return;
      }
      sortedIds = arrayMove([...ids], event.previousIndex, event.currentIndex);
    }

    const queues: number[] = this.logisticKeyPointsService.queues;

    const input: RouteChangeOrderInput = {
      items: sortedIds.map(
        (id: string, index: number): KeyPointChangeOrderInput => ({
          id,
          queue: queues[index],
        }),
      ),
    };

    this.isDragGroup = false;

    this.routeItemService.changeOrder(input).subscribe(() => {
      this.logisticKeyPointsService.reloadKeyPoints();
    });
  }

  createMarkers(hideUnselected: boolean = false): void {
    const markers: google.maps.Marker[] = [];
    for (const [index, routeItem] of this.logisticKeyPointsService.keyPoints.entries()) {
      let color: string = '';
      switch (routeItem.pointType) {
        case KeyPointTypeEnum.BREAK_POINT: {
          color = 'red';
          break;
        }
        case KeyPointTypeEnum.PICK_UP: {
          color = 'blue';
          break;
        }
        case KeyPointTypeEnum.DROP_OFF: {
          color = 'green';
          break;
        }
        case KeyPointTypeEnum.MOBILITY_REFUEL: {
          color = 'yellow';
          break;
        }
        default: {
          color = 'green';
          break;
        }
      }

      const marker: google.maps.Marker = new google.maps.Marker({
        title: routeItem.pointType,
        position: routeItem.location,
        clickable: true,
        icon: {
          url: `../../../../../../assets/img/map-markers/${color}-marker.svg`,
          anchor: new google.maps.Point(26, 45.5),
          scaledSize: new google.maps.Size(52, 58.5),
        },
        label: {
          text: `${index + 1}`,
          className: 'map-label',
        },
      });
      if (hideUnselected) {
        marker.setVisible(this.checkedKeyPoints.has(routeItem.id));
      }

      marker.set('id', routeItem.id);
      marker.set('routeItem', routeItem);
      marker.set('index', index);
      markers.push(marker);
    }
    this.routePlanningService.setMarkers(markers, 'KEY_POINTS');
  }

  deleteId: string | null = null;
  updateRouteItemId: string | null = null;
  openPanel$: Subject<'updateRouteItem' | 'createRouteItem' | 'close'> = new Subject<'updateRouteItem' | 'createRouteItem' | 'close'>();
  showModal: boolean = false;

  onShowDeleteModal(id?: string): void {
    if (id) {
      this.deleteId = id;
      this.showModal = true;
    }
  }

  onDelete(): void {
    if (this.deleteId) {
      this.onDeleteOne(this.deleteId);
    } else if (this.checkedKeyPoints.size > 0) {
      this.onDeleteMany([...this.checkedKeyPoints.values()]);
    }
  }

  onDeleteOne(id: string): void {
    this.crudKeyPointService.delete(id).subscribe(() => {
      this.routePlanningService.reloadAll();
      this.onCloseModal();
      this.deleteId = null;
      this.notification.success('Remove point', 'Point removed from the route');
    });
  }

  onDeleteMany(ids: string[]): void {
    this.crudKeyPointService.deleteMany({ ids }).subscribe(() => {
      this.routePlanningService.reloadAll();
      this.onCloseModal();
      this.notification.success('Remove points', `${ids.length} points are deleted`);
    });
  }

  onClosePanel(): void {
    this.updateRouteId = null;
    this.updateRouteItemId = null;
    this.openPanel$.next('close');
  }

  onCloseModal(): void {
    this.showModal = false;
    this.deleteId = null;
  }

  dateTimeStart: string = '';
  dateTimeEnd: string = '';
  updateRouteId: string | null = null;

  createRouteItem = {
    form: CreateKeyPointComponent as Type<DynamicForm<KeyPointCreateInput>>,

    formInputs: {
      value: null,
    } as DynamicFormInputs,

    formOutputs: {
      formSubmit: (value: KeyPointCreateInput): void => this.createRouteItem.update(value),
      formValueChanges: (value: RouteEntity): void => alert(value),
    } as DynamicFormOutputs,

    onShowForm: (): void => {
      this.createRouteItem.formInputs = {
        show: Symbol('true'),
        defaultFilters: {
          routeId: this.logisticRoutesService.activeRouteId,
          dateTimeStart: this.dateTimeStart,
          dateTimeEnd: this.dateTimeEnd,
        },
      };
      this.openPanel$.next('createRouteItem');
    },

    onButtonClick: (): void => {
      this.createRouteItem.formInputs = { submit: Symbol('update') };
    },

    update: (value: KeyPointCreateInput): void => {
      this.crudKeyPointService.create(value).subscribe(() => {
        this.routePlanningService.reloadAll();
        this.onClosePanel();
      });
    },
  };

  console = console;

  updateKeyPoint = {
    form: UpdateKeyPointComponent as Type<DynamicForm<KeyPointUpdateInput>>,

    formInputs: {
      value: null,
    } as DynamicFormInputs,

    formOutputs: {
      formSubmit: (value: KeyPointUpdateInput): void => this.updateKeyPoint.update(value),
      formValueChanges: (value: RouteEntity): void => alert(value),
    } as DynamicFormOutputs,

    onShowForm: (item: KeyPointEntity | KeyPointDto): void => {
      this.updateKeyPoint.formInputs = { value: null, submit: undefined, show: Symbol('true') };
      this.openPanel$.next('updateRouteItem');

      this.updateRouteItemId = item.id;
      this.updateKeyPoint.loadOne(item.id);
    },

    onButtonClick: (): void => {
      this.updateKeyPoint.formInputs = { submit: Symbol('update') };
    },

    loadOne: (id: string): void => {
      this.crudKeyPointService.findOne(id, { lang: LangCodeEnum.ALL }).subscribe((value: KeyPointEntity) => {
        this.updateKeyPoint.formInputs = {
          value: {
            ...value,
            dateTimeStart: this.dateTimeStart,
            dateTimeEnd: this.dateTimeEnd,
          },
        };
        this.detectorRef.detectChanges();
      });
    },
    update: (value: KeyPointUpdateInput): void => {
      if (this.updateRouteItemId) {
        this.crudKeyPointService.update(this.updateRouteItemId, value).subscribe(() => {
          this.routePlanningService.reloadAll();
          this.onClosePanel();
        });
      }
    },
  };
}
