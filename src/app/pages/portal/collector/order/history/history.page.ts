import { Component, OnInit } from '@angular/core';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {HttpResponse} from '@angular/common/http';
import {DataService} from '../../../../../services/data/data.service';
import {Order} from '../../../../../interfaces/order';
import {EventpingOrder} from '../../../../../interfaces/eventpingOrder';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  // Urls
  private urlOrders = 'collector/orders';
  private urlOrder = 'collector/order';

  // Variables

  lOrdersOpen: Order[] = [];
  lOrdersClosed: Order[] = [];

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

        let lOrders = data.body;
        this.lOrdersOpen = lOrders['lOrdersOpen'];
        this.lOrdersClosed = lOrders['lOrdersClosed'];
        /*
        lOrders.forEach((order: Order) => {
          if (order.tStatus < 2) {
            this.lOrdersOpen.push(order);
          } else {
            this.lOrdersClosed.push(order);
          }
          console.log('Länge'+this.lOrdersClosed);
        });
         */
      }
    });
  }

  ping($event: EventpingOrder) {
      const order: Order = $event.object;
      if ($event.label === 'delete') {

        this.connApi.safeDelete(this.urlOrder+"/"+order.id).subscribe((response : HttpResponse<any>) => {
          this.dataService.callOrder(null);
          if (order.tStatus < 2) {
            this.lOrdersOpen.splice(this.lOrdersOpen.indexOf(order), 1)
          } else {
            this.lOrdersClosed.splice(this.lOrdersClosed.indexOf(order), 1)
          }
        });
      }
  }
}
