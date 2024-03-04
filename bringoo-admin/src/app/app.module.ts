import { DATE_PIPE_DEFAULT_TIMEZONE, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { defaultTimeZoneConst } from '../shared/const/default-time-zone.const';
import { AuthGuard } from '../shared/helpers/auth.guard';
import { AuthInterceptor } from '../shared/interceptors/auth.interceptor';
import { ExportInterceptor } from '../shared/interceptors/export.interceptor';
import { GlobalErrorHandlerInterceptor } from '../shared/interceptors/global-error-handler.interceptor';
import { LanguageInterceptor } from '../shared/interceptors/language.interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { PushNotificationModule } from './push-notification/push-notification.module';

registerLocaleData(localeDe, 'de');

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    PushNotificationModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerInterceptor },
    AuthGuard,
    {
      provide: LOCALE_ID,
      useValue: 'de',
    },
    {
      provide: DATE_PIPE_DEFAULT_TIMEZONE,
      useValue: defaultTimeZoneConst.timeZone,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExportInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
