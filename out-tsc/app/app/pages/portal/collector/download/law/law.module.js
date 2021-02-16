import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LawPageRoutingModule } from './law-routing.module';
import { LawPage } from './law.page';
let LawPageModule = class LawPageModule {
};
LawPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            LawPageRoutingModule
        ],
        declarations: [LawPage]
    })
], LawPageModule);
export { LawPageModule };
//# sourceMappingURL=law.module.js.map