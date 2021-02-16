import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerificationPage } from './verification.page';
const routes = [
    {
        path: '',
        component: VerificationPage
    }
];
let VerificationPageRoutingModule = class VerificationPageRoutingModule {
};
VerificationPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], VerificationPageRoutingModule);
export { VerificationPageRoutingModule };
//# sourceMappingURL=verification-routing.module.js.map