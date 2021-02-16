import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgreementPageRoutingModule } from './agreement-routing.module';
import { AgreementPage } from './agreement.page';
let AgreementPageModule = class AgreementPageModule {
};
AgreementPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            AgreementPageRoutingModule
        ],
        declarations: [AgreementPage]
    })
], AgreementPageModule);
export { AgreementPageModule };
//# sourceMappingURL=agreement.module.js.map