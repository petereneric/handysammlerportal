import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgreementPage } from './agreement.page';
const routes = [
    {
        path: '',
        component: AgreementPage,
    }
];
let AgreementPageRoutingModule = class AgreementPageRoutingModule {
};
AgreementPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], AgreementPageRoutingModule);
export { AgreementPageRoutingModule };
//# sourceMappingURL=agreement-routing.module.js.map