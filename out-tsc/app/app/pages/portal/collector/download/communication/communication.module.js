import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommunicationPageRoutingModule } from './communication-routing.module';
import { CommunicationPage } from './communication.page';
let CommunicationPageModule = class CommunicationPageModule {
};
CommunicationPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            CommunicationPageRoutingModule
        ],
        declarations: [CommunicationPage]
    })
], CommunicationPageModule);
export { CommunicationPageModule };
//# sourceMappingURL=communication.module.js.map