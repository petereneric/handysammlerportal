import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ResourcesPageRoutingModule } from './resources-routing.module';
import { ResourcesPage } from './resources.page';
let ResourcesPageModule = class ResourcesPageModule {
};
ResourcesPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ResourcesPageRoutingModule
        ],
        declarations: [ResourcesPage]
    })
], ResourcesPageModule);
export { ResourcesPageModule };
//# sourceMappingURL=resources.module.js.map