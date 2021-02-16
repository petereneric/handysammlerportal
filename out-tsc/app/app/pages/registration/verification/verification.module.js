import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VerificationPageRoutingModule } from './verification-routing.module';
import { VerificationPage } from './verification.page';
let VerificationPageModule = class VerificationPageModule {
};
VerificationPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            VerificationPageRoutingModule
        ],
        declarations: [VerificationPage]
    })
], VerificationPageModule);
export { VerificationPageModule };
//# sourceMappingURL=verification.module.js.map