import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LawPage } from './law.page';
const routes = [
    {
        path: '',
        component: LawPage
    }
];
let LawPageRoutingModule = class LawPageRoutingModule {
};
LawPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], LawPageRoutingModule);
export { LawPageRoutingModule };
//# sourceMappingURL=law-routing.module.js.map