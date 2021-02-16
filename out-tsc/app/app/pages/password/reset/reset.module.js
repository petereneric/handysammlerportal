import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ResetPageRoutingModule } from './reset-routing.module';
import { ResetPage } from './reset.page';
let ResetPageModule = class ResetPageModule {
};
ResetPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ResetPageRoutingModule,
            ReactiveFormsModule
        ],
        declarations: [ResetPage]
    })
], ResetPageModule);
export { ResetPageModule };
//# sourceMappingURL=reset.module.js.map