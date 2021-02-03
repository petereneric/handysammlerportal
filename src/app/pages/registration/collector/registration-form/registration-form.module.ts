import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationFormPageRoutingModule } from './registration-form-routing.module';

import { RegistrationFormPage } from './registration-form.page';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegistrationFormPageRoutingModule,
        ReactiveFormsModule,
        MatIconModule
    ],
  declarations: [RegistrationFormPage]
})
export class RegistrationFormPageModule {}
