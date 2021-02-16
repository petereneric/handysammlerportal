import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DonationPage } from './donation.page';
const routes = [
    {
        path: '',
        component: DonationPage
    }
];
let DonationPageRoutingModule = class DonationPageRoutingModule {
};
DonationPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], DonationPageRoutingModule);
export { DonationPageRoutingModule };
//# sourceMappingURL=donation-routing.module.js.map