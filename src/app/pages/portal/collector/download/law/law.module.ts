import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LawPageRoutingModule } from './law-routing.module';

import { LawPage } from './law.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LawPageRoutingModule
  ],
  declarations: [LawPage]
})
export class LawPageModule {}
