import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPage } from './about.page';
import {DataCollectorPage} from '../data/data-collector.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: AboutPage,
    children: [
      {
        path: 'impressum',
        loadChildren: () => import('./impressum/impressum.module').then( m => m.ImpressumPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/impressum'
  },
  {
    path: 'impressum',
    loadChildren: () => import('./impressum/impressum.module').then( m => m.ImpressumPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutPageRoutingModule {}
