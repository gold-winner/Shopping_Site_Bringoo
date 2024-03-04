import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, filter, shareReplay, switchMap, tap } from 'rxjs/operators';

import { KeyPointDto } from '../../../../../shared/api/auth/data-contracts';
import { LogisticRouteService } from '../../../../../shared/api/auth/logistic-route.service';
import { isNonNull } from '../../../../../shared/helpers/is-non-null.helper';
import { KeyPointsSearchType } from '../types/key-points-search.type';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class LogisticKeyPointsService {
  private readonly keyPointsSubject: BehaviorSubject<KeyPointDto[]> = new BehaviorSubject<KeyPointDto[]>([]);
  readonly keyPoints$: Observable<KeyPointDto[]> = this.keyPointsSubject.asObservable().pipe(shareReplay(1));
  get keyPoints(): KeyPointDto[] {
    return this.keyPointsSubject.getValue();
  }

  get ids(): string[] {
    return this.keyPointsSubject.getValue().map(({ id }: KeyPointDto) => id);
  }

  get queues(): number[] {
    return this.keyPointsSubject.getValue().map(({ queue }: KeyPointDto) => queue);
  }

  private readonly isLoadingKeyPointSubject: Subject<boolean> = new Subject<boolean>();
  readonly isLoadingKeyPoint$: Observable<boolean> = this.isLoadingKeyPointSubject.asObservable();

  private readonly searchSubject: BehaviorSubject<KeyPointsSearchType | null> = new BehaviorSubject<KeyPointsSearchType | null>(null);
  readonly search$: Observable<KeyPointsSearchType> = this.searchSubject.asObservable().pipe(filter(isNonNull));
  private readonly pointWithErrorSubject: Subject<string | null> = new Subject<string | null>();
  readonly pointWithError$: Observable<string | null> = this.pointWithErrorSubject.asObservable();

  constructor(private readonly routeService: LogisticRouteService) {}

  subOnSearchChanges(): void {
    this.search$
      .pipe(
        untilDestroyed(this),
        tap(() => {
          this.isLoadingKeyPointSubject.next(true);
          this.pointWithErrorSubject.next(null);
        }),
        switchMap(({ routeId }: KeyPointsSearchType) => {
          return routeId ? this.routeService.points(routeId) : of([]);
        }),
        tap((points: KeyPointDto[]) => {
          this.keyPointsSubject.next(points);
          this.isLoadingKeyPointSubject.next(false);
        }),
      )
      .subscribe();
  }

  reloadKeyPoints(): void {
    const search: KeyPointsSearchType | null = this.searchSubject.getValue();
    if (search) {
      this.searchSubject.next({ ...search });
    }
  }

  patchSearch(input: KeyPointsSearchType): void {
    this.searchSubject.next(input);
  }

  setActiveRoute(routeId: string | null): void {
    this.searchSubject.next({ ...this.searchSubject, routeId: routeId ?? '' });
  }

  setDriverForOrdersInRoute(routeId: string): Observable<boolean> {
    return this.routeService.setDriverForAllOrdersInRoute(routeId).pipe(
      catchError((err: { error: { message: string } }) => {
        const matches: RegExpMatchArray | null = err.error.message.match(/\(.*\)/g);

        if (matches) {
          const orderNumber: string = matches[0].replace(/[()]/g, '');
          this.pointWithErrorSubject.next(orderNumber);
          const kpWithOrder: HTMLDivElement | null = document.querySelector(`[order-number='${orderNumber}']`);
          kpWithOrder?.scrollIntoView();
        }
        return throwError(err);
      }),
    );
  }

  private deleteSubject: Subject<string> = new Subject<string>();
  readonly delete$: Observable<string> = this.deleteSubject.asObservable();

  deleteKeyPoint(id: string): void {
    this.deleteSubject.next(id);
  }

  private updateSubject: Subject<KeyPointDto> = new Subject<KeyPointDto>();
  readonly update$: Observable<KeyPointDto> = this.updateSubject.asObservable();

  updateKeyPoint(keyPoint: KeyPointDto): void {
    this.updateSubject.next(keyPoint);
  }
}
