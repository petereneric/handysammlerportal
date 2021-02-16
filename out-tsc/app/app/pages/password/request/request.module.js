import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RequestPageRoutingModule } from './request-routing.module';
import { RequestPage } from './request.page';
let RequestPageModule = class RequestPageModule {
};
RequestPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RequestPageRoutingModule,
            ReactiveFormsModule
        ],
        declarations: [RequestPage]
    })
], RequestPageModule);
export { RequestPageModule };
//# sourceMappingURL=request.module.js.map