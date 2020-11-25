import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataCollectorPage } from './data-collector.page';

const routes: Routes = [
  {
    path: '',
    component: DataCollectorPage,
    children: [
      {
        path: 'main',
        loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
      },
      {
        path: 'public',
        loadChildren: () => import('./public/public.module').then( m => m.PublicPageModule)
      },
      {
        path: 'locations',
        loadChildren: () => import('./locations/locations.module').then( m => m.LocationsPageModule)
      },
      {
        path: 'donation',
        loadChildren: () => import('./donation/donation.module').then( m => m.DonationPageModule)
      },
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataCollectorPageRoutingModule {}
