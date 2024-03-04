import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoyaltyProgramComponent } from './components/loyalty-program/loyalty-program.component';
import { LoyaltyProgramSetupModule } from './modules/loyalty-program-setup/loyalty-program-setup.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoyaltyProgramComponent,
  },
  {
    path: 'setup',
    data: {
      breadcrumb: 'Loyalty Program Setup',
    },
    loadChildren: (): Promise<Type<LoyaltyProgramSetupModule>> =>
      import('./modules/loyalty-program-setup/loyalty-program-setup.module').then(
        (m: { LoyaltyProgramSetupModule: Type<LoyaltyProgramSetupModule> }) => m.LoyaltyProgramSetupModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoyaltyProgramRouterModule {}
