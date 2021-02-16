import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExpiredPage } from './expired.page';
const routes = [
    {
        path: '',
        component: ExpiredPage
    }
];
let ExpiredPageRoutingModule = class ExpiredPageRoutingModule {
};
ExpiredPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ExpiredPageRoutingModule);
export { ExpiredPageRoutingModule };
//# sourceMappingURL=expired-routing.module.js.map