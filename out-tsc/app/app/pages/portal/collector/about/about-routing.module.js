import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutPage } from './about.page';
const routes = [
    {
        path: 'tabs',
        component: AboutPage,
        children: [
            {
                path: 'impressum',
                loadChildren: () => import('./impressum/impressum.module').then(m => m.ImpressumPageModule)
            },
        ]
    },
    {
        path: '',
        redirectTo: 'tabs/impressum'
    },
    {
        path: 'impressum',
        loadChildren: () => import('./impressum/impressum.module').then(m => m.ImpressumPageModule)
    },
];
let AboutPageRoutingModule = class AboutPageRoutingModule {
};
AboutPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], AboutPageRoutingModule);
export { AboutPageRoutingModule };
//# sourceMappingURL=about-routing.module.js.map