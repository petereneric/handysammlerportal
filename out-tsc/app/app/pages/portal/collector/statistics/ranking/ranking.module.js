import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RankingPageRoutingModule } from './ranking-routing.module';
import { RankingPage } from './ranking.page';
let RankingPageModule = class RankingPageModule {
};
RankingPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RankingPageRoutingModule
        ],
        declarations: [RankingPage]
    })
], RankingPageModule);
export { RankingPageModule };
//# sourceMappingURL=ranking.module.js.map