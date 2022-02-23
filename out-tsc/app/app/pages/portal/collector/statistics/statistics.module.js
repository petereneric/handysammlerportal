import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StatisticsPageRoutingModule } from './statistics-routing.module';
import { StatisticsPage } from './statistics.page';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
let StatisticsPageModule = class StatisticsPageModule {
};
StatisticsPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            StatisticsPageRoutingModule,
            [MatTooltipModule],
            MatIconModule,
        ],
        declarations: [StatisticsPage]
    })
], StatisticsPageModule);
export { StatisticsPageModule };
//# sourceMappingURL=statistics.module.js.map