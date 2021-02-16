import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataCollectorPage } from './data-collector.page';
const routes = [
    {
        path: 'tabs',
        component: DataCollectorPage,
        children: [
            {
                path: 'main',
                loadChildren: () => import('./main/main.module').then(m => m.MainPageModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
            },
            {
                path: 'locations',
                loadChildren: () => import('./locations/locations.module').then(m => m.LocationsPageModule)
            },
            {
                path: 'donation',
                loadChildren: () => import('./donation/donation.module').then(m => m.DonationPageModule)
            },
            {
                path: 'settings',
                loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
            },
        ]
    },
    {
        path: '',
        redirectTo: 'tabs/main'
    },
];
let DataCollectorPageRoutingModule = class DataCollectorPageRoutingModule {
};
DataCollectorPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], DataCollectorPageRoutingModule);
export { DataCollectorPageRoutingModule };
//# sourceMappingURL=data-collector-routing.module.js.map