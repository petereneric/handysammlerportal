import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
let ProfilePageModule = class ProfilePageModule {
};
ProfilePageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ProfilePageRoutingModule,
            ReactiveFormsModule
        ],
        declarations: [ProfilePage]
    })
], ProfilePageModule);
export { ProfilePageModule };
//# sourceMappingURL=profile.module.js.map