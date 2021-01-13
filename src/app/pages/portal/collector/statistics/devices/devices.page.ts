import { Component, OnInit } from '@angular/core';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {

  // Variables
  lFilter = ["Gesamt", "Jahr"]
  cFilter = this.lFilter[0]
  lSelect = ["Dieses Jahr", "Letztes Jahr"]
  cSelect = this.lSelect[0]

  constructor(private connApi: ConnApiService, public toastController: ToastController, public alertController: AlertController) {
  }

  ngOnInit() {

  }

  onFilter($event: any) {
    console.log($event);
    switch ($event['detail']['value']) {
      case this.lFilter[0]:

        break;
      case this.lFilter[1]:

        break;
    }
  }

  onSelect($event: any) {
    
  }
}
