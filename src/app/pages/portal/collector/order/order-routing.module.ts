import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrderPage} from './order.page';

const routes: Routes = [
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
            }]
    },
    {
        path: '',
        redirectTo: 'tabs/add'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrderPageRoutingModule {
}
