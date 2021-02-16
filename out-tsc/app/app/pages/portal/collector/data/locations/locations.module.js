import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationsPageRoutingModule } from './locations-routing.module';
import { LocationsPage } from './locations.page';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocationComponentModule } from '../../../../../components/location/location.module';
let LocationsPageModule = class LocationsPageModule {
};
LocationsPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            LocationsPageRoutingModule,
            MatIconModule,
            ReactiveFormsModule,
            MatTooltipModule,
            LocationComponentModule,
        ],
        declarations: [LocationsPage]
    })
], LocationsPageModule);
export { LocationsPageModule };
//# sourceMappingURL=locations.module.js.map