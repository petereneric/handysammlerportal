import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgreementPageRoutingModule } from './agreement-routing.module';

import { AgreementPage } from './agreement.page';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgreementPageRoutingModule,
    HttpClientModule
  ],
  declarations: [AgreementPage]
})
export class AgreementPageModule {}
