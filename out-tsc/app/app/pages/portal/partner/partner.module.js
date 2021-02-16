import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PartnerPageRoutingModule } from './partner-routing.module';
import { PartnerPage } from './partner.page';
let PartnerPageModule = class PartnerPageModule {
};
PartnerPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            PartnerPageRoutingModule
        ],
        declarations: [PartnerPage]
    })
], PartnerPageModule);
export { PartnerPageModule };
//# sourceMappingURL=partner.module.js.map