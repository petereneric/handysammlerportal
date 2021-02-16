import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HistoryPage = class HistoryPage {
    constructor(connApi) {
        this.connApi = connApi;
        // Urls
        this.urlRecords = 'collector/records';
        // Variables
        this.records = [];
    }
    ngOnInit() {
        this.connApi.safeGet(this.urlRecords).subscribe((data) => {
            if (data.status == 200) {
                console.log(data);
                console.log("jooooo");
                this.records = data.body;
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