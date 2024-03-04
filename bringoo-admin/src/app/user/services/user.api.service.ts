import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LoadingService } from '../../../shared/services/loading.service';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  url = `${environment.apiUrl}users`;

  getPage(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>,
  ): Observable<{ results: User[] }> {
    let params: HttpParams = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    for (const filter of filters) {
      for (const value of filter.value) {
        params = params.append(filter.key, value);
      }
    }
    return this.loadingService.wrap(
      this.http.get<{ results: User[] }>(`${this.url}/list`, { params }),
    );
  }

  create(model: User): void {
    this.loadingService.wrap(this.http.post<User>(`${this.url}/create`, model)).subscribe();
  }

  update(model: User): void {
    this.loadingService.wrap(this.http.patch<User>(`${this.url}/update`, model)).subscribe();
  }

  constructor(private http: HttpClient, private loadingService: LoadingService) {}
}
