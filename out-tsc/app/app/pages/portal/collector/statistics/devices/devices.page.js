import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { StatisticsPage } from "../statistics.page";
let DevicesPage = class DevicesPage extends StatisticsPage {
    constructor(connApi, router) {
        super(connApi, router);
        this.connApi = connApi;
        this.router = router;
        // Urls
        this.urlStatistics = "collector/statistics/devices";
    }
    ngOnInit() {
        this.load();
    }
    getPayment(payment) {
        return payment.replace('.', ',') + ' €';
    }
};
DevicesPage = __decorate([
    Component({
        selector: 'app-devices',
        templateUrl: './devices.page.html',
        styleUrls: ['./devices.page.scss'],
    })
], DevicesPage);
export { DevicesPage };
//# sourceMappingURL=devices.page.js.map