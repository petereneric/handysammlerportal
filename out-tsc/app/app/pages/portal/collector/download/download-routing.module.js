import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DownloadPage } from './download.page';
const routes = [
    {
        path: 'tabs',
        component: DownloadPage,
        children: [
            {
                path: 'bills',
                loadChildren: () => import('./bills/bills.module').then(m => m.BillsPageModule)
            },
            {
                path: 'certificates',
                loadChildren: () => import('./certificates/certificates.module').then(m => m.CertificatesPageModule)
            },
            {
                path: 'information',
                loadChildren: () => import('./information/information.module').then(m => m.InformationPageModule)
            },
            {
                path: 'communication',
                loadChildren: () => import('./communication/communication.module').then(m => m.CommunicationPageModule)
            },
            {
                path: 'law',
                loadChildren: () => import('./law/law.module').then(m => m.LawPageModule)
            },
        ]
    },
    {
        path: '',
        redirectTo: 'tabs/bills'
    },
];
let DownloadPageRoutingModule = class DownloadPageRoutingModule {
};
DownloadPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], DownloadPageRoutingModule);
export { DownloadPageRoutingModule };
//# sourceMappingURL=download-routing.module.js.map