import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { CookieGuardService } from '../../services/cookie-guard/cookie-guard.service';
const routes = [
    {
        path: '',
        component: LoginPage,
        canActivate: [CookieGuardService]
    }
];
let LoginPageRoutingModule = class LoginPageRoutingModule {
};
LoginPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], LoginPageRoutingModule);
export { LoginPageRoutingModule };
//# sourceMappingURL=login-routing.module.js.map