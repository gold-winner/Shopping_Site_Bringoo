import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { SidebarModule } from 'ng-sidebar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { GuestAuthenticationService } from '../shared/services/guest-authentication.service';
import { SharedModule } from '../shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 30,
    },
    vertical: {
      position: 'top',
      distance: 50,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    NgxSkeletonLoaderModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions),
    SidebarModule.forRoot(),
  ],
  providers: [GuestAuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private guestAuthenticationService: GuestAuthenticationService) {}
}
