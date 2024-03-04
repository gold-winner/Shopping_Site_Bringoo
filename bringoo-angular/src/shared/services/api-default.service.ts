import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie';
// import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, filter, finalize, mergeMap, publishReplay, refCount, switchMap, take } from 'rxjs/operators';

// import { InputError } from 'src/shared/api/data-contracts';
import { LanguagesService } from './languages.service';
import { RefreshService } from './refresh.service';
export const GET_TOKEN_URLS: string[] = [
  '/auth-customer/guest-sign-up',
  '/auth-customer/sign-up',
  '/auth-customer/refresh',
  '/auth-customer/sign-in',
];
export type RefreshTokenStatus = 'doRefresh' | 'refreshed' | 'cancel';

@Injectable({
  providedIn: 'root',
})
export class ApiDefaultService {
  protected url: string = 'https://auth.dev.bringooapi.com';
  private httpHeaders: HttpHeaders = new HttpHeaders();
  // httpHeaders.set('Access-Control-Allow-Origin', '*');
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // private errorsSubject: Subject<InputError[]> = new Subject<InputError[]>();
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable().pipe(publishReplay(1), refCount());
  // errors$: Observable<InputError[]> = this.errorsSubject.asObservable().pipe(publishReplay(1), refCount());

  constructor(
    private readonly http: HttpClient,
    // private readonly notification: NzNotificationService,
    private languagesService: LanguagesService,
    private refreshService: RefreshService,
  ) {}

  private setAccessToken(): void {
    const accessToken: string = Cookies.get('accessToken') ?? '';
    if (accessToken) {
      this.httpHeaders = this.httpHeaders.set('Authorization', `Bearer ${accessToken}`);
    } else {
      this.httpHeaders = this.httpHeaders.delete('Authorization');
    }
  }

  request<Response, Request>(
    url: string,
    type: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
    payload?: Request,
    queryParams?: {
      [param: string]: any;
    },
  ): Observable<Response> {
    this.isLoadingSubject.next(true);
    let httpParams: HttpParams = new HttpParams();

    if (queryParams) {
      httpParams = new HttpParams({
        fromObject: queryParams,
      });
    }

    if (!Cookies.get('accessToken') && !GET_TOKEN_URLS.includes(url)) {
      this.refreshService.refresh.next('doRefresh');

      return this.refreshService.refresh.asObservable().pipe(
        filter((status: RefreshTokenStatus) => status === 'refreshed'),
        take(1),
        switchMap(() => this.getRequestByType<Response, Request>(type, url, httpParams, payload)),
      );
    }

    return this.getRequestByType<Response, Request>(type, url, httpParams, payload);
  }

  private getRequestByType<Response, Request>(
    type: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
    url: string,
    httpParams: HttpParams,
    payload?: Request,
  ): Observable<Response> {
    let request: Observable<Response>;

    switch (type) {
      case 'POST': {
        request = this.postRequest<Request, Response>(url, httpParams, payload);
        break;
      }
      case 'PATCH': {
        request = this.patchRequest<Request, Response>(url, httpParams, payload);
        break;
      }
      case 'DELETE': {
        request = this.deleteRequest<Response>(url, httpParams);
        break;
      }
      case 'PUT': {
        request = this.putRequest<Request, Response>(url, httpParams);
        break;
      }
      default: {
        request = this.getRequest<Response>(url, httpParams);
      }
    }
    return request.pipe(
      // retryWhen((errors: Observable<HttpErrorResponse>) => this.onRetry(errors, url)),
      finalize(() => this.onFinalize()),
      // catchError((err: HttpErrorResponse) => this.onCatchError(err)),
    );
  }

  private postRequest<Request, Response>(url: string, queryParams?: HttpParams, input?: Request): Observable<Response> {
    this.setAccessToken();
    return this.http.post<Response>(this.url + url, input, { params: queryParams, headers: this.httpHeaders });
  }

  private patchRequest<Request, Response>(url: string, queryParams?: HttpParams, input?: Request): Observable<Response> {
    this.setAccessToken();
    return this.http.patch<Response>(this.url + url, input, { params: queryParams, headers: this.httpHeaders });
  }

  private putRequest<Request, Response>(url: string, queryParams?: HttpParams, input?: Request): Observable<Response> {
    this.setAccessToken();
    return this.http.put<Response>(this.url + url, input, { params: queryParams, headers: this.httpHeaders });
  }

  private getRequest<Response>(url: string, queryParams?: HttpParams): Observable<Response> {
    this.setAccessToken();
    if (!queryParams) {
      queryParams = new HttpParams();
    }

    if (!queryParams.get('lang')) {
      queryParams = queryParams.set('lang', this.languagesService.language);
    }

    return !url.toLowerCase().includes('export')
      ? this.http.get<Response>(this.url + url, {
          params: queryParams,
          headers: this.httpHeaders,
        })
      : (this.http.get(this.url + url, {
          params: queryParams,
          headers: this.httpHeaders,
          responseType: 'blob',
        }) as any);
  }

  private deleteRequest<Response>(url: string, queryParams?: HttpParams): Observable<Response> {
    this.setAccessToken();
    this.isLoadingSubject.next(true);
    return this.http.delete<Response>(this.url + url, { params: queryParams, headers: this.httpHeaders });
  }

  private onFinalize(): void {
    this.isLoadingSubject.next(false);
  }

  private onRetry: (errors: Observable<HttpErrorResponse>, url: string) => Observable<any> = (
    errors: Observable<HttpErrorResponse>,
    url: string,
  ): Observable<any> => {
    return errors.pipe(
      mergeMap((responseError: HttpErrorResponse, retryCounter: number) => {
        if (responseError.status === 401 && retryCounter === 0 && !GET_TOKEN_URLS.includes(url)) {
          this.refreshService.refresh.next('doRefresh');
          return of().pipe(
            delay(500),
            switchMap(() =>
              this.refreshService.refresh.asObservable().pipe(
                filter((status: RefreshTokenStatus): boolean => status === 'refreshed'),
                take(1),
              ),
            ),
          );
        }
        return throwError(responseError);
      }),
    );
  };

  // private onCatchError(err: HttpErrorResponse): Observable<never> | MonoTypeOperatorFunction<unknown> {
  //   if (err.status === 400) {
  //     // this.errorsSubject.next(err.error.message as InputError[]);
  //   }

  //   const notificationText: string =
  //     (err.status !== 400 && err.status === 401) || !Array.isArray(err.error.message)
  //       ? err.error.message
  //       : err.error.message.map(({ message, property }: InputError) => `${property}: ${message}`).join('\n');

  //   this.notification.create('error', 'Error', notificationText, {
  //     nzDuration: 10000,
  //     nzPlacement: 'bottomLeft',
  //   });
  //   return throwError(err);
  // }
}
