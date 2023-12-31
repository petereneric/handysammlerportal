import { __decorate } from "tslib";
import { RegistrationFormPageRoutingModule } from './registration-form-routing.module';
import { RegistrationFormPage } from './registration-form.page';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
import { Toast } from '../../../../utilities/toast';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { FooterModule } from "../../../../components/footer/footer.module";
let RegistrationFormPageModule = class RegistrationFormPageModule {
};
RegistrationFormPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RegistrationFormPageRoutingModule,
            ReactiveFormsModule,
            [MatTooltipModule],
            MatIconModule,
            FooterModule
        ],
        providers: [Toast],
        declarations: [RegistrationFormPage]
    })
], RegistrationFormPageModule);
export { RegistrationFormPageModule };
//# sourceMappingURL=registration-form.module.js.map