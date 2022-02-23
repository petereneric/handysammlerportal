import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HistoryPage = class HistoryPage {
    constructor(connApi, dataService) {
        this.connApi = connApi;
        this.dataService = dataService;
        // Urls
        this.urlOrders = 'collector/orders';
        this.urlOrder = 'collector/order';
        // Variables
        this.lOrdersOpen = [];
        this.lOrdersClosed = [];
        this.orders = [];
    }
    ngOnInit() {
        this.load();
        this.dataService.getData().subscribe((data) => {
            this.load();
        });
    }
    load() {
        this.connApi.safeGet(this.urlOrders).subscribe((data) => {
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
    ping($event) {
        const order = $event.object;
        if ($event.label === 'delete') {
            this.connApi.safeDelete(this.urlOrder + "/" + order.id).subscribe((response) => {
                this.dataService.callOrder(null);
                if (order.tStatus < 2) {
                    this.lOrdersOpen.splice(this.lOrdersOpen.indexOf(order), 1);
                }
                else {
                    this.lOrdersClosed.splice(this.lOrdersClosed.indexOf(order), 1);
                }
            });
        }
    }
};
HistoryPage = __decorate([
    Component({
        selector: 'app-history',
        templateUrl: './history.page.html',
        styleUrls: ['./history.page.scss'],
    })
], HistoryPage);
export { HistoryPage };
//# sourceMappingURL=history.page.js.map