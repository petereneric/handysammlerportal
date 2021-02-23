import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImpressumPage } from './impressum.page';
import { CookieGuardService } from '../../../../services/cookie-guard/cookie-guard.service';
const routes = [
    {
        path: '',
        component: ImpressumPage,
        canActivate: [CookieGuardService]
    }
];
let ImpressumPageRoutingModule = class ImpressumPageRoutingModule {
};
ImpressumPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ImpressumPageRoutingModule);
export { ImpressumPageRoutingModule };
//# sourceMappingURL=impressum-routing.module.js.map