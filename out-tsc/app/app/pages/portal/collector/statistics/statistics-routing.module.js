import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatisticsPage } from './statistics.page';
const routes = [
    {
        path: 'tabs',
        component: StatisticsPage,
        children: [
            {
                path: 'devices',
                loadChildren: () => import('./devices/devices.module').then(m => m.DevicesPageModule)
            },
            {
                path: 'resources',
                loadChildren: () => import('./resources/resources.module').then(m => m.ResourcesPageModule)
            },
            {
                path: 'ranking',
                loadChildren: () => import('./ranking/ranking.module').then(m => m.RankingPageModule)
            }
        ]
    },
    {
        path: '',
        redirectTo: 'tabs/devices'
    },
];
let StatisticsPageRoutingModule = class StatisticsPageRoutingModule {
};
StatisticsPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], StatisticsPageRoutingModule);
export { StatisticsPageRoutingModule };
//# sourceMappingURL=statistics-routing.module.js.map