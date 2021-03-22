import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonationPageRoutingModule } from './donation-routing.module';

import { DonationPage } from './donation.page';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DonationPageRoutingModule,
        [MatTooltipModule],
        MatIconModule
    ],
  declarations: [DonationPage]
})
export class DonationPageModule {}
