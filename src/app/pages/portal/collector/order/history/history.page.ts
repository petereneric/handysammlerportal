import { Component, OnInit } from '@angular/core';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {HttpResponse} from '@angular/common/http';
import {DataService} from '../../../../../services/data/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  // Urls
  private urlOrders = 'collector/orders';

  // Variables
  public orders = [];
  public boxVisible: boolean;
  public bricolageVisible: boolean;


  constructor(private connApi: ConnApiService, private dataService: DataService) { }

  ngOnInit() {
    this.load();

    this.dataService.getData().subscribe((data) => {
        this.load()
    })
  }

  load() {
    this.connApi.safeGet(this.urlOrders).subscribe((data: HttpResponse<any>) => {
      if (data.status == 200) {
        console.log(data);
        this.orders = data.body;

        let boxOrders = 0;
        let bricolageOrders = 0;

        for (var i = 0; i < this.orders.length; i++) {
          if (this.orders[i]['NUMBER_BOX'] > 0) boxOrders++;
          if (this.orders[i]['NUMBER_BRICOLAGE'] > 0) bricolageOrders++;
        }

        this.boxVisible = boxOrders > 0;
        this.bricolageVisible = bricolageOrders > 0;
      }
    });
  }
}
