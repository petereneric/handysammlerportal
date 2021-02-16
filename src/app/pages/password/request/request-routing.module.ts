import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestPage } from './request.page';

const routes: Routes = [
  {
    path: 'role/:role',
    component: RequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestPageRoutingModule {}
