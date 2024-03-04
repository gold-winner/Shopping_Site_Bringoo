import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable().pipe(publishReplay(1), refCount());

  wrap<T>(observable$: Observable<T>): Observable<T> {
    this.isLoadingSubject.next(true);
    return observable$.pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
}
