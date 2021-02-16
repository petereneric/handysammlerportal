import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResetPage } from './reset.page';
const routes = [
    {
        path: 'token/:token',
        component: ResetPage
    }
];
let ResetPageRoutingModule = class ResetPageRoutingModule {
};
ResetPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ResetPageRoutingModule);
export { ResetPageRoutingModule };
//# sourceMappingURL=reset-routing.module.js.map