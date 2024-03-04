import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingDatenschutzComponent } from './components/landing-datenschutz/landing-datenschutz.component';
import { LandingImpressumComponent } from './components/landing-impressum/landing-impressum.component';
import { LandingPartnersComponent } from './components/landing-partners/landing-partners.component';
import { LandingPartnershipComponent } from './components/landing-partnership/landing-partnership.component';
import { LandingPaymentComponent } from './components/landing-payment/landing-payment.component';
import { LandingWorkComponent } from './components/landing-work/landing-work.component';
import { LandingComponent } from './landing.component';
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'how-we-work', component: LandingWorkComponent },
  { path: 'payment', component: LandingPaymentComponent },
  { path: 'impressum', component: LandingImpressumComponent },
  { path: 'datenschutz', component: LandingDatenschutzComponent },
  { path: 'partnership', component: LandingPartnershipComponent },
  { path: 'partners', component: LandingPartnersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
