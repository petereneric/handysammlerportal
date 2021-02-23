import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationPage } from './confirmation.page';
import { CookieGuardService } from '../../../services/cookie-guard/cookie-guard.service';
const routes = [
    {
        path: 'token/:token',
        component: ConfirmationPage
    },
    {
        path: 'test',
        component: ConfirmationPage,
        canActivate: [CookieGuardService]
    },
];
let ConfirmationPageRoutingModule = class ConfirmationPageRoutingModule {
};
ConfirmationPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ConfirmationPageRoutingModule);
export { ConfirmationPageRoutingModule };
//# sourceMappingURL=confirmation-routing.module.js.map