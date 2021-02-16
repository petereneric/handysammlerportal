import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocationsPage } from './locations.page';
const routes = [
    {
        path: '',
        component: LocationsPage
    }
];
let LocationsPageRoutingModule = class LocationsPageRoutingModule {
};
LocationsPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], LocationsPageRoutingModule);
export { LocationsPageRoutingModule };
//# sourceMappingURL=locations-routing.module.js.map