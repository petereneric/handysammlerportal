import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HistoryPage } from './history.page';
const routes = [
    {
        path: '',
        component: HistoryPage
    }
];
let HistoryPageRoutingModule = class HistoryPageRoutingModule {
};
HistoryPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], HistoryPageRoutingModule);
export { HistoryPageRoutingModule };
//# sourceMappingURL=history-routing.module.js.map