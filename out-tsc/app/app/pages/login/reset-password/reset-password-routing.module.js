import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResetPasswordPage } from './reset-password.page';
const routes = [
    {
        path: '',
        component: ResetPasswordPage
    }
];
let ResetPasswordPageRoutingModule = class ResetPasswordPageRoutingModule {
};
ResetPasswordPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ResetPasswordPageRoutingModule);
export { ResetPasswordPageRoutingModule };
//# sourceMappingURL=reset-password-routing.module.js.map