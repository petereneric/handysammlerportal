import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SendPageRoutingModule } from './send-routing.module';
import { SendPage } from './send.page';
let SendPageModule = class SendPageModule {
};
SendPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            SendPageRoutingModule
        ],
        declarations: [SendPage]
    })
], SendPageModule);
export { SendPageModule };
//# sourceMappingURL=send.module.js.map