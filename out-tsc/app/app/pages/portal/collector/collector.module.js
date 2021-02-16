import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CollectorPageRoutingModule } from './collector-routing.module';
import { CollectorPage } from './collector.page';
import { RegistrationFormPageModule } from '../../registration/collector/registration-form/registration-form.module';
let CollectorPageModule = class CollectorPageModule {
};
CollectorPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            CollectorPageRoutingModule,
            RegistrationFormPageModule
        ],
        declarations: [CollectorPage]
    })
], CollectorPageModule);
export { CollectorPageModule };
//# sourceMappingURL=collector.module.js.map