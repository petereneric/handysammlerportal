import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImpressumPageRoutingModule } from './impressum-routing.module';
import { ImpressumPage } from './impressum.page';
import { ImpressumComponentModule } from "../../../../../components/impressum/impressum.module";
let ImpressumPageModule = class ImpressumPageModule {
};
ImpressumPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ImpressumPageRoutingModule,
            ImpressumComponentModule
        ],
        exports: [],
        declarations: [ImpressumPage]
    })
], ImpressumPageModule);
export { ImpressumPageModule };
//# sourceMappingURL=impressum.module.js.map