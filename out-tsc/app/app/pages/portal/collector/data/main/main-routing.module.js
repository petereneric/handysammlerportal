import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainPage } from './main.page';
const routes = [
    {
        path: '',
        component: MainPage
    }
];
let MainPageRoutingModule = class MainPageRoutingModule {
};
MainPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], MainPageRoutingModule);
export { MainPageRoutingModule };
//# sourceMappingURL=main-routing.module.js.map