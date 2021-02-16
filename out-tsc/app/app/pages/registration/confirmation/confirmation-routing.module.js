import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationPage } from './confirmation.page';
const routes = [
    {
        path: 'token/:token',
        component: ConfirmationPage
    },
    {
        path: 'test',
        component: ConfirmationPage
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