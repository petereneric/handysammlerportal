import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AboutPageRoutingModule } from './about-routing.module';
import { AboutPage } from './about.page';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
let AboutPageModule = class AboutPageModule {
};
AboutPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            AboutPageRoutingModule,
            [MatTooltipModule],
            MatIconModule,
        ],
        declarations: [AboutPage]
    })
], AboutPageModule);
export { AboutPageModule };
//# sourceMappingURL=about.module.js.map