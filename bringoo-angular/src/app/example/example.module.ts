import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsComponent } from './components/forms/forms.component';
import { IconsComponent } from './components/icons/icons.component';
import { OthersComponent } from './components/others/others.component';
import { ExampleRoutingModule } from './example-routing.module';

@NgModule({
  declarations: [DashboardComponent, IconsComponent, ButtonsComponent, FormsComponent, CardsComponent, OthersComponent],
  imports: [SharedModule, ExampleRoutingModule, CommonModule],
})
export class ExampleModule {}
