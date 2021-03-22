import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DonationPageRoutingModule } from './donation-routing.module';
import { DonationPage } from './donation.page';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
let DonationPageModule = class DonationPageModule {
};
DonationPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            DonationPageRoutingModule,
            [MatTooltipModule],
            MatIconModule
        ],
        declarations: [DonationPage]
    })
], DonationPageModule);
export { DonationPageModule };
//# sourceMappingURL=donation.module.js.map