import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InformationPage } from './information.page';
const routes = [
    {
        path: '',
        component: InformationPage
    }
];
let InformationPageRoutingModule = class InformationPageRoutingModule {
};
InformationPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], InformationPageRoutingModule);
export { InformationPageRoutingModule };
//# sourceMappingURL=information-routing.module.js.map