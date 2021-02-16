import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BillsPageRoutingModule } from './bills-routing.module';
import { BillsPage } from './bills.page';
let BillsPageModule = class BillsPageModule {
};
BillsPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            BillsPageRoutingModule
        ],
        declarations: [BillsPage]
    })
], BillsPageModule);
export { BillsPageModule };
//# sourceMappingURL=bills.module.js.map