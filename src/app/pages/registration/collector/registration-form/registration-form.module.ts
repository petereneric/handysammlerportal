import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { RegistrationFormPageRoutingModule } from './registration-form-routing.module';

import { RegistrationFormPage } from './registration-form.page';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from '@angular/material/tooltip';
import {FooterComponent} from '../../../../components/footer/footer.component';
import {Toast} from '../../../../utilities/toast';
import {IonicModule} from "@ionic/angular";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegistrationFormPageRoutingModule,
        ReactiveFormsModule,
        [MatTooltipModule],
        MatIconModule,
    ],
    providers: [Toast],
    exports: [
        FooterComponent
    ],
    declarations: [RegistrationFormPage, FooterComponent]
})
export class RegistrationFormPageModule {}
