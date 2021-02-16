import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExpiredPageRoutingModule } from './expired-routing.module';
import { ExpiredPage } from './expired.page';
let ExpiredPageModule = class ExpiredPageModule {
};
ExpiredPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ExpiredPageRoutingModule
        ],
        declarations: [ExpiredPage]
    })
], ExpiredPageModule);
export { ExpiredPageModule };
//# sourceMappingURL=expired.module.js.map