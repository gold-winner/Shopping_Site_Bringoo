import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservableInput, Subject, throwError } from 'rxjs';
import { catchError, finalize, publishReplay, refCount } from 'rxjs/operators';

import { InputError } from '../api/auth/data-contracts';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected url: string = '';
  errorsSubject: Subject<InputError[]> = new Subject<InputError[]>();
  errors$: Observable<InputError[]> = this.errorsSubject.asObservable().pipe(publishReplay(1), refCount());
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable().pipe(publishReplay(1), refCount());

  constructor(private readonly http: HttpClient) {}

  request<Response, Request>(
    url: string,
    type: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
    body?: Request,
    queryParams?: {
      [param: string]: any;
    },
  ): Observable<Response> {
    this.isLoadingSubject.next(true);
    let params: HttpParams = new HttpParams();

    if (queryParams) {
      params = new HttpParams({
        fromObject: queryParams,
      });
    }

    return this.http
      .request<Response>(type.toLowerCase(), this.url + url, {
        body,
        params,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => this.onCatchError(error)),
        finalize(() => this.onFinalize()),
      );
  }

  private onCatchError(err: HttpErrorResponse): ObservableInput<any> {
    if (err.status === HttpStatusCode.BadRequest) {
      this.errorsSubject.next(err.error.message as InputError[]);
    }
    return throwError(err);
  }

  private onFinalize(): void {
    this.isLoadingSubject.next(false);
  }
}
