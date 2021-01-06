import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CollectorPage} from './collector.page';
import {AuthGuardService} from "../../../services/auth-guard/auth-guard.service";
import {DataCollectorPage} from "./data/data-collector.page";

const routes: Routes = [
    {
        path: 'collector/menu',
        component: CollectorPage,
        canActivate: [AuthGuardService],
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
        ]
    },
    {
        path: 'collector',
        redirectTo: 'collector/menu/data'
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CollectorPageRoutingModule {
}
