import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataCollectorPage } from './data-collector.page';

const routes: Routes = [
  {
    path: '',
    component: DataCollectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataCollectorPageRoutingModule {}
