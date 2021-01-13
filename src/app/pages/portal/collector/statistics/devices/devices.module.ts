import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule} from '@angular/forms';

import {AlertController, IonicModule, ToastController} from '@ionic/angular';

import { DevicesPageRoutingModule } from './devices-routing.module';

import { DevicesPage } from './devices.page';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevicesPageRoutingModule
  ],
  declarations: [DevicesPage]
})
export class DevicesPageModule {

}
