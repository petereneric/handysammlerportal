import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {RegistrationFormPageModule} from '../registration/collector/registration-form/registration-form.module';
import {FooterComponent} from "../../components/footer/footer.component";
import {FooterModule} from "../../components/footer/footer.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        ReactiveFormsModule,
        RegistrationFormPageModule,
        FooterModule
    ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
