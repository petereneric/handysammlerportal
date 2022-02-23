import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from "./footer.component";
import { IonicModule } from '@ionic/angular';
let FooterModule = class FooterModule {
};
FooterModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ReactiveFormsModule,
            IonicModule,
        ],
        exports: [
            FooterComponent
        ],
        declarations: [FooterComponent]
    })
], FooterModule);
export { FooterModule };
//# sourceMappingURL=footer.module.js.map