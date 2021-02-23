import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerificationPage } from './verification.page';
import { CookieGuardService } from '../../../services/cookie-guard/cookie-guard.service';
const routes = [
    {
        path: '',
        component: VerificationPage,
        canActivate: [CookieGuardService]
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