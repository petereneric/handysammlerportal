import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HistoryPageRoutingModule } from './history-routing.module';
import { HistoryPage } from './history.page';
import { LocationComponentModule } from '../../../../../components/order/order.module';
let HistoryPageModule = class HistoryPageModule {
};
HistoryPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            HistoryPageRoutingModule,
            LocationComponentModule
        ],
        declarations: [HistoryPage]
    })
], HistoryPageModule);
export { HistoryPageModule };
//# sourceMappingURL=history.module.js.map