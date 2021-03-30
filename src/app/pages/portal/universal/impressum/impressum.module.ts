import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpressumPageRoutingModule } from './impressum-routing.module';

import { ImpressumPage } from './impressum.page';
import {FooterComponent} from '../../../../components/footer/footer.component';
import {ImpressumComponent} from '../../../../components/impressum/impressum.component';
import {ImpressumComponentModule} from "../../../../components/impressum/impressum.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImpressumPageRoutingModule,
    ImpressumComponentModule
  ],
  exports: [
  ],
  declarations: [ImpressumPage]
})
export class ImpressumPageModule {}
