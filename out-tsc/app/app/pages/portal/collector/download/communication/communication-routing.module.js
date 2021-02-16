import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommunicationPage } from './communication.page';
const routes = [
    {
        path: '',
        component: CommunicationPage
    }
];
let CommunicationPageRoutingModule = class CommunicationPageRoutingModule {
};
CommunicationPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], CommunicationPageRoutingModule);
export { CommunicationPageRoutingModule };
//# sourceMappingURL=communication-routing.module.js.map