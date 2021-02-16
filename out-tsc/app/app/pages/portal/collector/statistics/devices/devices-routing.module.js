import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevicesPage } from './devices.page';
const routes = [
    {
        path: '',
        component: DevicesPage
    }
];
let DevicesPageRoutingModule = class DevicesPageRoutingModule {
};
DevicesPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], DevicesPageRoutingModule);
export { DevicesPageRoutingModule };
//# sourceMappingURL=devices-routing.module.js.map