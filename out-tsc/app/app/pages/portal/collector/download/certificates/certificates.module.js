import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CertificatesPageRoutingModule } from './certificates-routing.module';
import { CertificatesPage } from './certificates.page';
let CertificatesPageModule = class CertificatesPageModule {
};
CertificatesPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            CertificatesPageRoutingModule
        ],
        declarations: [CertificatesPage]
    })
], CertificatesPageModule);
export { CertificatesPageModule };
//# sourceMappingURL=certificates.module.js.map