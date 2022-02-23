import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SendPageRoutingModule } from './send-routing.module';
import { SendPage } from './send.page';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
let SendPageModule = class SendPageModule {
};
SendPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            SendPageRoutingModule,
            [MatTooltipModule],
            MatIconModule,
        ],
        declarations: [SendPage]
    })
], SendPageModule);
export { SendPageModule };
//# sourceMappingURL=send.module.js.map