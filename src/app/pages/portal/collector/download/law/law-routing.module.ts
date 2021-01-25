import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LawPage } from './law.page';

const routes: Routes = [
  {
    path: '',
    component: LawPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LawPageRoutingModule {}
