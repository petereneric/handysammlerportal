import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PartnerPage } from './partner.page';
const routes = [
    {
        path: '',
        component: PartnerPage
    }
];
let PartnerPageRoutingModule = class PartnerPageRoutingModule {
};
PartnerPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], PartnerPageRoutingModule);
export { PartnerPageRoutingModule };
//# sourceMappingURL=partner-routing.module.js.map