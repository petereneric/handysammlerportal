import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HistoryPage = class HistoryPage {
    constructor(connApi, dataService) {
        this.connApi = connApi;
        this.dataService = dataService;
        // Urls
        this.urlOrders = 'collector/orders';
        // Variables
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
                this.orders = data.body;
                let boxOrders = 0;
                let bricolageOrders = 0;
                for (var i = 0; i < this.orders.length; i++) {
                    if (this.orders[i]['NUMBER_BOX'] > 0)
                        boxOrders++;
                    if (this.orders[i]['NUMBER_BRICOLAGE'] > 0)
                        bricolageOrders++;
                }
                this.boxVisible = boxOrders > 0;
                this.bricolageVisible = bricolageOrders > 0;
            }
        });
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