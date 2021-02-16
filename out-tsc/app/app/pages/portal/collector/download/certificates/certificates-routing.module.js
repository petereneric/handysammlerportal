import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CertificatesPage } from './certificates.page';
const routes = [
    {
        path: '',
        component: CertificatesPage
    }
];
let CertificatesPageRoutingModule = class CertificatesPageRoutingModule {
};
CertificatesPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], CertificatesPageRoutingModule);
export { CertificatesPageRoutingModule };
//# sourceMappingURL=certificates-routing.module.js.map