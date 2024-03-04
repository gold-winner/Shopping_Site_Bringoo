import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsComponent } from './components/forms/forms.component';
import { IconsComponent } from './components/icons/icons.component';
import { OthersComponent } from './components/others/others.component';
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'components/icons', component: IconsComponent },
  { path: 'components/buttons', component: ButtonsComponent },
  { path: 'components/forms', component: FormsComponent },
  { path: 'components/cards', component: CardsComponent },
  { path: 'components/others', component: OthersComponent },
  // eslint-disable-next-line @typescript-eslint/typedef
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExampleRoutingModule {}
