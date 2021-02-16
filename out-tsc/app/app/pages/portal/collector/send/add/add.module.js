import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddPageRoutingModule } from './add-routing.module';
import { AddPage } from './add.page';
let AddPageModule = class AddPageModule {
};
AddPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            AddPageRoutingModule
        ],
        declarations: [AddPage]
    })
], AddPageModule);
export { AddPageModule };
//# sourceMappingURL=add.module.js.map