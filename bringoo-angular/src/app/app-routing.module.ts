import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExampleModule } from './example/example.module';
import { PagesModule } from './pages/pages.module';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    // eslint-disable-next-line @typescript-eslint/typedef
    loadChildren: (): Promise<PagesModule> => import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'example',
    // canActivate: [AuthGuard],
    // eslint-disable-next-line @typescript-eslint/typedef
    loadChildren: (): Promise<ExampleModule> => import('./example/example.module').then((m) => m.ExampleModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
