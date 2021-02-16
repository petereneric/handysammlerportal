import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderPage } from './order.page';
const routes = [
    {
        path: 'tabs',
        component: OrderPage,
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
let OrderPageRoutingModule = class OrderPageRoutingModule {
};
OrderPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], OrderPageRoutingModule);
export { OrderPageRoutingModule };
//# sourceMappingURL=order-routing.module.js.map