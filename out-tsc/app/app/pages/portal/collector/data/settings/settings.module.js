import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SettingsPageRoutingModule } from './settings-routing.module';
import { SettingsPage } from './settings.page';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
let SettingsPageModule = class SettingsPageModule {
};
SettingsPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            SettingsPageRoutingModule,
            [MatTooltipModule],
            MatIconModule
        ],
        declarations: [SettingsPage]
    })
], SettingsPageModule);
export { SettingsPageModule };
//# sourceMappingURL=settings.module.js.map