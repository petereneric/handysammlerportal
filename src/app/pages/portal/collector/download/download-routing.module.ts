import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadPage } from './download.page';

const routes: Routes = [
  {
    path: 'tabs',
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
      },
      {
        path: 'communication',
        loadChildren: () => import('./communication/communication.module').then( m => m.CommunicationPageModule)
      },
      {
        path: 'law',
        loadChildren: () => import('./law/law.module').then( m => m.LawPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/bills'
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadPageRoutingModule {}
