import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResourcesPage } from './resources.page';
const routes = [
    {
        path: '',
        component: ResourcesPage
    }
];
let ResourcesPageRoutingModule = class ResourcesPageRoutingModule {
};
ResourcesPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ResourcesPageRoutingModule);
export { ResourcesPageRoutingModule };
//# sourceMappingURL=resources-routing.module.js.map