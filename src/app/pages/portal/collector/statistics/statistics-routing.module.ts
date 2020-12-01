import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsPage } from './statistics.page';

const routes: Routes = [
  {
    path: '',
    component: StatisticsPage,
    children: [
      {
        path: 'devices',
        loadChildren: () => import('./devices/devices.module').then( m => m.DevicesPageModule)
      },
      {
        path: 'resources',
        loadChildren: () => import('./resources/resources.module').then( m => m.ResourcesPageModule)
      },
      {
        path: 'ranking',
        loadChildren: () => import('./ranking/ranking.module').then( m => m.RankingPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsPageRoutingModule {}
