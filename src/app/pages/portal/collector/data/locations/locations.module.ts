import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationsPageRoutingModule } from './locations-routing.module';
import { LocationsPage } from './locations.page';
import {LocationComponent} from '../../../../../components/location/location.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LocationComponentModule} from '../../../../../components/location/location.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationsPageRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTooltipModule,
    LocationComponentModule,
  ],
  declarations: [LocationsPage]
})
export class LocationsPageModule {}
