import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectorPage } from './collector.page';

const routes: Routes = [
  {
    path: '',
    component: CollectorPage
  },
  {
    path: 'data-collector',
    loadChildren: () => import('./data-collector/data-collector.module').then( m => m.DataCollectorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectorPageRoutingModule {}
