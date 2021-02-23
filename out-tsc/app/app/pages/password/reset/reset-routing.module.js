import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResetPage } from './reset.page';
import { CookieGuardService } from '../../../services/cookie-guard/cookie-guard.service';
const routes = [
    {
        path: 'token/:token',
        component: ResetPage,
        canActivate: [CookieGuardService]
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