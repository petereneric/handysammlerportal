import { Component, OnInit } from '@angular/core';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {AlertController, ToastController} from '@ionic/angular';
import {HttpResponse} from "@angular/common/http";
import {StatisticsPage} from "../statistics.page";
import {Router} from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage extends StatisticsPage implements OnInit {

  // Urls
  urlStatistics = "collector/statistics/devices"

  constructor(public connApi: ConnApiService, public router: Router) {
    super(connApi, router);
  }

  ngOnInit() {
    this.load()
  }

  getPayment(payment) {
    return payment.replace('.', ',')+' €'
  }







}
