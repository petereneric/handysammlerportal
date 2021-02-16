import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfirmationPageRoutingModule } from './confirmation-routing.module';
import { ConfirmationPage } from './confirmation.page';
let ConfirmationPageModule = class ConfirmationPageModule {
};
ConfirmationPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ConfirmationPageRoutingModule
        ],
        declarations: [ConfirmationPage]
    })
], ConfirmationPageModule);
export { ConfirmationPageModule };
//# sourceMappingURL=confirmation.module.js.map