import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpressumPageRoutingModule } from './impressum-routing.module';

import { ImpressumPage } from './impressum.page';
import {FooterComponent} from '../../../../components/footer/footer.component';
import {ImpressumComponent} from '../../../../components/impressum/impressum.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImpressumPageRoutingModule
  ],
  exports: [
    ImpressumComponent
  ],
  declarations: [ImpressumPage, ImpressumComponent]
})
export class ImpressumPageModule {}
