import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DataCollectorPage} from './data-collector.page';

const routes: Routes = [
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

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DataCollectorPageRoutingModule {
}
