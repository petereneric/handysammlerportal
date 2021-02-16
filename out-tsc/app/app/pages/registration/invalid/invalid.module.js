import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InvalidPageRoutingModule } from './invalid-routing.module';
import { InvalidPage } from './invalid.page';
let InvalidPageModule = class InvalidPageModule {
};
InvalidPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            InvalidPageRoutingModule
        ],
        declarations: [InvalidPage]
    })
], InvalidPageModule);
export { InvalidPageModule };
//# sourceMappingURL=invalid.module.js.map