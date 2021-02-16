import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';
import { ResetPasswordPage } from './reset-password.page';
let ResetPasswordPageModule = class ResetPasswordPageModule {
};
ResetPasswordPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ResetPasswordPageRoutingModule,
            ReactiveFormsModule
        ],
        declarations: [ResetPasswordPage]
    })
], ResetPasswordPageModule);
export { ResetPasswordPageModule };
//# sourceMappingURL=reset-password.module.js.map