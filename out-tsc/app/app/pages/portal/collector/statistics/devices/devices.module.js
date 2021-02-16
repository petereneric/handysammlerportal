import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DevicesPageRoutingModule } from './devices-routing.module';
import { DevicesPage } from './devices.page';
let DevicesPageModule = class DevicesPageModule {
};
DevicesPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            DevicesPageRoutingModule
        ],
        declarations: [DevicesPage]
    })
], DevicesPageModule);
export { DevicesPageModule };
//# sourceMappingURL=devices.module.js.map