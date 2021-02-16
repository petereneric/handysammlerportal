import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsPage } from './settings.page';
const routes = [
    {
        path: '',
        component: SettingsPage
    }
];
let SettingsPageRoutingModule = class SettingsPageRoutingModule {
};
SettingsPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], SettingsPageRoutingModule);
export { SettingsPageRoutingModule };
//# sourceMappingURL=settings-routing.module.js.map