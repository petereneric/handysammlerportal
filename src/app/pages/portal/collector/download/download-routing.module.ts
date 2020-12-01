import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadPage } from './download.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadPage,
    children: [
      {
        path: 'bills',
        loadChildren: () => import('./bills/bills.module').then( m => m.BillsPageModule)
      },
      {
        path: 'certificates',
        loadChildren: () => import('./certificates/certificates.module').then( m => m.CertificatesPageModule)
      },
      {
        path: 'information',
        loadChildren: () => import('./information/information.module').then( m => m.InformationPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadPageRoutingModule {}
