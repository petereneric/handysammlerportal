import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddPage } from './add.page';
const routes = [
    {
        path: '',
        component: AddPage
    }
];
let AddPageRoutingModule = class AddPageRoutingModule {
};
AddPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], AddPageRoutingModule);
export { AddPageRoutingModule };
//# sourceMappingURL=add-routing.module.js.map