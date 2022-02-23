import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataCollectorPageRoutingModule } from './data-collector-routing.module';
import { DataCollectorPage } from './data-collector.page';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
let DataCollectorPageModule = class DataCollectorPageModule {
};
DataCollectorPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            DataCollectorPageRoutingModule,
            [MatTooltipModule],
            MatIconModule,
        ],
        declarations: [DataCollectorPage]
    })
], DataCollectorPageModule);
export { DataCollectorPageModule };
//# sourceMappingURL=data-collector.module.js.map