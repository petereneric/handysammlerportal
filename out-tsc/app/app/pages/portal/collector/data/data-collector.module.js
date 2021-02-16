import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataCollectorPageRoutingModule } from './data-collector-routing.module';
import { DataCollectorPage } from './data-collector.page';
let DataCollectorPageModule = class DataCollectorPageModule {
};
DataCollectorPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            DataCollectorPageRoutingModule
        ],
        declarations: [DataCollectorPage]
    })
], DataCollectorPageModule);
export { DataCollectorPageModule };
//# sourceMappingURL=data-collector.module.js.map