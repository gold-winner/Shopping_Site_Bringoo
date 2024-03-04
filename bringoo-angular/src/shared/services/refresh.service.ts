import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type RefreshTokenStatus = 'doRefresh' | 'refreshed' | 'cancel';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  public refresh: BehaviorSubject<RefreshTokenStatus> = new BehaviorSubject<'doRefresh' | 'refreshed' | 'cancel'>('cancel');
}
