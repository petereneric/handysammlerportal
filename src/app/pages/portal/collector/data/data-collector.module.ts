import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataCollectorPageRoutingModule } from './data-collector-routing.module';
import { DataCollectorPage } from './data-collector.page';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataCollectorPageRoutingModule,
    [MatTooltipModule],
    MatIconModule,
  ],
  declarations: [DataCollectorPage]
})
export class DataCollectorPageModule {}
