import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestPage } from './request.page';
import { CookieGuardService } from '../../../services/cookie-guard/cookie-guard.service';
const routes = [
    {
        path: 'role/:role',
        component: RequestPage,
        canActivate: [CookieGuardService]
    }
];
let RequestPageRoutingModule = class RequestPageRoutingModule {
};
RequestPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], RequestPageRoutingModule);
export { RequestPageRoutingModule };
//# sourceMappingURL=request-routing.module.js.map