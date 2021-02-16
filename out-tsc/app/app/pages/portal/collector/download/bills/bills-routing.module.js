import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BillsPage } from './bills.page';
const routes = [
    {
        path: '',
        component: BillsPage
    }
];
let BillsPageRoutingModule = class BillsPageRoutingModule {
};
BillsPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], BillsPageRoutingModule);
export { BillsPageRoutingModule };
//# sourceMappingURL=bills-routing.module.js.map