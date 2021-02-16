import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainPageRoutingModule } from './main-routing.module';
import { MainPage } from './main.page';
let MainPageModule = class MainPageModule {
};
MainPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            MainPageRoutingModule,
            ReactiveFormsModule
        ],
        declarations: [MainPage]
    })
], MainPageModule);
export { MainPageModule };
//# sourceMappingURL=main.module.js.map