import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InformationPageRoutingModule } from './information-routing.module';
import { InformationPage } from './information.page';
let InformationPageModule = class InformationPageModule {
};
InformationPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            InformationPageRoutingModule
        ],
        declarations: [InformationPage]
    })
], InformationPageModule);
export { InformationPageModule };
//# sourceMappingURL=information.module.js.map