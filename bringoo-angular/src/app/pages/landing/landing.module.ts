import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AuthModule } from 'src/app/pages/auth/auth.module';

import { SharedModule } from '../../../shared/shared.module';
import { LandingCardComponent } from './components/landing-card/landing-card.component';
import { LandingDatenschutzComponent } from './components/landing-datenschutz/landing-datenschutz.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { LandingImpressumComponent } from './components/landing-impressum/landing-impressum.component';
import { LandingPartnersComponent } from './components/landing-partners/landing-partners.component';
import { LandingPartnershipComponent } from './components/landing-partnership/landing-partnership.component';
import { LandingPaymentComponent } from './components/landing-payment/landing-payment.component';
import { LandingWorkComponent } from './components/landing-work/landing-work.component';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
@NgModule({
  declarations: [
    LandingComponent,
    LandingHomeComponent,
    LandingCardComponent,
    LandingWorkComponent,
    LandingImpressumComponent,
    LandingDatenschutzComponent,
    LandingPaymentComponent,
    LandingPartnershipComponent,
    LandingPartnersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    IvyCarouselModule,
    GoogleMapsModule,
    RouterModule,
    LandingRoutingModule,
    AuthModule,
    NgxSkeletonLoaderModule.forRoot(),
  ],
})
export class LandingModule {}
