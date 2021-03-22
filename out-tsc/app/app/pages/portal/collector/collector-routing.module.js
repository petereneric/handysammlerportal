import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollectorPage } from './collector.page';
import { AuthGuardService } from "../../../services/auth-guard/auth-guard.service";
import { CookieGuardService } from '../../../services/cookie-guard/cookie-guard.service';
const routes = [
    {
        path: 'collector/menu',
        component: CollectorPage,
        canActivate: [CookieGuardService, AuthGuardService],
        children: [
            {
                path: 'data',
                loadChildren: () => import('./data/data-collector.module').then(m => m.DataCollectorPageModule)
            },
            {
                path: 'order',
                loadChildren: () => import('./order/order.module').then(m => m.OrderPageModule)
            },
            {
                path: 'send',
                loadChildren: () => import('./send/send.module').then(m => m.SendPageModule)
            },
            {
                path: 'statistics',
                loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsPageModule)
            },
            {
                path: 'download',
                loadChildren: () => import('./download/download.module').then(m => m.DownloadPageModule)
            },
            {
                path: 'about',
                loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
            },
        ]
    },
    {
        path: 'collector',
        redirectTo: 'collector/menu/data'
    },
    {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
    },
];
let CollectorPageRoutingModule = class CollectorPageRoutingModule {
};
CollectorPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], CollectorPageRoutingModule);
export { CollectorPageRoutingModule };
//# sourceMappingURL=collector-routing.module.js.map