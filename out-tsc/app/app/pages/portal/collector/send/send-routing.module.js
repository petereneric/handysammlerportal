import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SendPage } from './send.page';
const routes = [
    {
        path: 'tabs',
        component: SendPage,
        children: [
            {
                path: 'add',
                loadChildren: () => import('./add/add.module').then(m => m.AddPageModule)
            },
            {
                path: 'history',
                loadChildren: () => import('./history/history.module').then(m => m.HistoryPageModule)
            }
        ]
    },
    {
        path: '',
        redirectTo: 'tabs/add'
    },
];
let SendPageRoutingModule = class SendPageRoutingModule {
};
SendPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], SendPageRoutingModule);
export { SendPageRoutingModule };
//# sourceMappingURL=send-routing.module.js.map