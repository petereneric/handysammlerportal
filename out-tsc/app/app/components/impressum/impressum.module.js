import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImpressumComponent } from "./impressum.component";
import { IonicModule } from '@ionic/angular';
let ImpressumComponentModule = class ImpressumComponentModule {
};
ImpressumComponentModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ReactiveFormsModule,
            IonicModule,
        ],
        exports: [
            ImpressumComponent
        ],
        declarations: [ImpressumComponent]
    })
], ImpressumComponentModule);
export { ImpressumComponentModule };
//# sourceMappingURL=impressum.module.js.map