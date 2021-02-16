import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrationFormPage } from './registration-form.page';
const routes = [
    /*
  {
    path: 'test',
    component: RegistrationFormPage,

  },
  */
    {
        path: 'id/:id',
        component: RegistrationFormPage
    }
];
let RegistrationFormPageRoutingModule = class RegistrationFormPageRoutingModule {
};
RegistrationFormPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], RegistrationFormPageRoutingModule);
export { RegistrationFormPageRoutingModule };
//# sourceMappingURL=registration-form-routing.module.js.map