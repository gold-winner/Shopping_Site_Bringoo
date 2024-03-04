import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, switchMapTo, tap } from 'rxjs/operators';

import { AppManagerPushNotificationHistoryService } from '../../../shared/api/auth/app-manager-push-notification-history.service';
import { PushNotificationHistoryDto } from '../../../shared/api/auth/data-contracts';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  notReadedNotifications$: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);
  currentMessage$: BehaviorSubject<any> = new BehaviorSubject(null);
  token: string | null = null;

  constructor(
    private readonly angularFireMessaging: AngularFireMessaging,
    private readonly appManagerPushNotificationHistoryService: AppManagerPushNotificationHistoryService,
  ) {}

  requestPermission(): Observable<string | null> {
    return this.angularFireMessaging.requestToken.pipe(
      tap((token: string | null) => {
        this.token = token;
        // eslint-disable-next-line @typescript-eslint/typedef,no-console
        console.log('Permission granted! Save to the server!', token);
      }),
    );
  }

  deleteToken(): Observable<boolean> {
    return this.angularFireMessaging.getToken.pipe(
      mergeMap((token: string | null) => this.angularFireMessaging.deleteToken(token || '')),
      tap(() => {
        // eslint-disable-next-line @typescript-eslint/typedef,no-console
        console.log('Token deleted!');
      }),
    );
  }

  receiveMessage(): Observable<any> {
    return this.angularFireMessaging.messages.pipe(
      tap((payload: any) => {
        // eslint-disable-next-line @typescript-eslint/typedef,no-console
        console.log('new message received.', payload);
        this.currentMessage$.next(payload);
      }),
      switchMapTo(this.updateNotReadedNotifications()),
    );
  }

  updateNotReadedNotifications(): Observable<any> {
    return this.appManagerPushNotificationHistoryService.getNotReadedHistories().pipe(
      tap((historiesDto: PushNotificationHistoryDto[]) => {
        const notifications: string[] = historiesDto.map(({ title, body }: PushNotificationHistoryDto) => `${title}: ${body}`);
        this.notReadedNotifications$.next(notifications);
      }),
    );
  }
}
