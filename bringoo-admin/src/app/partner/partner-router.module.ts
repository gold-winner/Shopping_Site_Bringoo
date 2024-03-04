import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/helpers/auth.guard';
import { PageNotFoundComponent } from '../layout/components/page-not-found/page-not-found.component';
import { ConsultationRequestModule } from './modules/consultation-request/consultation-request.module';
import { PartnerMollieModule } from './modules/partner-mollie/partner-mollie.module';

const routes: Routes = [
  {
    path: 'mollie',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<PartnerMollieModule>> =>
      import('./modules/partner-mollie/partner-mollie.module').then(
        (m: { PartnerMollieModule: Type<PartnerMollieModule> }) => m.PartnerMollieModule,
      ),
  },
  {
    path: 'consultation-request',
    canActivate: [AuthGuard],
    loadChildren: (): Promise<Type<ConsultationRequestModule>> =>
      import('./modules/consultation-request/consultation-request.module').then(
        (m: { ConsultationRequestModule: Type<ConsultationRequestModule> }) => m.ConsultationRequestModule,
      ),
  },
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnerRouterModule {}
