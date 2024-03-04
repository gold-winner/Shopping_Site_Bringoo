import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';

import { CrudRouteService } from '../../../../../shared/api/auth/crud-route.service';
import { RouteChangeOrderInput, RouteDto, RoutesSearchInput } from '../../../../../shared/api/auth/data-contracts';
import { LogisticRouteService } from '../../../../../shared/api/auth/logistic-route.service';
import { isNonNull } from '../../../../../shared/helpers/is-non-null.helper';
import { LogisticKeyPointsService } from './logistic-key-points.service';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class LogisticRoutesService {
  private readonly routesSubject: BehaviorSubject<RouteDto[]> = new BehaviorSubject<RouteDto[]>([]);
  readonly routes$: Observable<RouteDto[]> = this.routesSubject.asObservable();
  routesContainerIds$: Observable<string[]> = this.routesSubject
    .asObservable()
    .pipe(map((data: RouteDto[]) => data.map(({ id }: RouteDto) => id)));

  private readonly searchSubject: BehaviorSubject<RoutesSearchInput | null> = new BehaviorSubject<RoutesSearchInput | null>(null);
  private search$: Observable<RoutesSearchInput> = this.searchSubject.asObservable().pipe(filter(isNonNull));
  private readonly activeRouteSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  activeRoute$: Observable<string | null> = this.activeRouteSubject.asObservable();

  private readonly isLoading: Subject<boolean> = new Subject<boolean>();
  isLoadingRoutes$: Observable<boolean> = this.isLoading.asObservable();

  constructor(
    private readonly routeService: LogisticRouteService,
    private readonly crudRouteService: CrudRouteService,
    private readonly notification: NzNotificationService,
    private readonly logisticKeyPointsService: LogisticKeyPointsService,
  ) {}

  get routeIds(): string[] {
    return this.routesSubject.getValue().map(({ id }: RouteDto) => id);
  }

  get routeQueue(): number[] {
    return this.routesSubject.getValue().map(({ queue }: RouteDto) => queue);
  }

  get activeRouteId(): string | null {
    return this.activeRouteSubject.getValue();
  }

  subOnSearchChanges(): void {
    this.search$
      .pipe(
        untilDestroyed(this),
        tap(() => this.isLoading.next(true)),
        debounceTime(500),
        switchMap((input: RoutesSearchInput) => {
          return this.routeService.routes(input);
        }),
        tap(() => this.isLoading.next(false)),
      )
      .subscribe((routes: RouteDto[]) => {
        this.routesSubject.next(routes);
      });
  }

  patchFilters(input: RoutesSearchInput): void {
    this.searchSubject.next(input);
  }

  reloadRoutes(): void {
    this.searchSubject.next({ ...this.searchSubject.getValue() });
    const filters: string | null = this.activeRouteSubject.getValue();
    this.activeRouteSubject.next(filters ? filters : null);
  }

  deleteOneRoute(id: string): Observable<number> {
    return this.crudRouteService.delete(id).pipe(
      tap(() => {
        if (this.activeRouteSubject.getValue() === id) {
          this.setActiveRoute(null);
        }

        this.notification.success('Remove route', 'Route successfully removed');
        this.reloadRoutes();
      }),
    );
  }

  deleteManyRoutes(ids: string[]): Observable<number> {
    return this.crudRouteService.deleteMany({ ids }).pipe(
      tap(() => {
        const activeId: string | null = this.activeRouteSubject.getValue();

        if (activeId && ids.includes(activeId)) {
          this.setActiveRoute(null);
        }

        this.notification.success('Remove points', `${ids.length} points are deleted`);
        this.reloadRoutes();
      }),
    );
  }

  changeRoutesQueue(input: RouteChangeOrderInput): void {
    this.isLoading.next(true);
    this.routeService.changeOrder(input).subscribe(() => {
      this.reloadRoutes();
    });
  }

  setActiveRoute(id: string | null): void {
    this.activeRouteSubject.next(id);
    this.logisticKeyPointsService.setActiveRoute(id);
  }
}
