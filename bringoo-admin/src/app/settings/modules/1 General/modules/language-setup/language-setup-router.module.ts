import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LanguageCrudComponent } from './components/language-crud/language-crud.component';

const routes: Routes = [{ path: '', component: LanguageCrudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanguageSetupRouterModule {}
