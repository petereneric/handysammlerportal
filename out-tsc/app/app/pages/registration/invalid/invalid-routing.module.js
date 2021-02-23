import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvalidPage } from './invalid.page';
import { CookieGuardService } from '../../../services/cookie-guard/cookie-guard.service';
const routes = [
    {
        path: '',
        component: InvalidPage,
        canActivate: [CookieGuardService]
    }
];
let InvalidPageRoutingModule = class InvalidPageRoutingModule {
};
InvalidPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], InvalidPageRoutingModule);
export { InvalidPageRoutingModule };
//# sourceMappingURL=invalid-routing.module.js.map