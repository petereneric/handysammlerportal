import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MyPage } from '../../my-page';
let StatisticsPage = class StatisticsPage extends MyPage {
    constructor(connApi, router) {
        super(router);
        this.connApi = connApi;
        this.router = router;
        // Urls
        this.urlStatistics = "";
        // Variables
        this.lFilter = ["Gesamt", "Jahr"];
        this.cFilter = this.lFilter[0];
        this.lSelect = [];
        this.cSelect = null;
        this.lData = null;
    }
    ngOnInit() {
    }
    onFilter($event) {
        switch ($event['detail']['value']) {
            case this.lFilter[0]:
                break;
            case this.lFilter[1]:
                this.lSelect = ["Dieses Jahr", "Letztes Jahr"];
                if (this.cSelect == null)
                    this.cSelect = this.lSelect[0];
                break;
        }
        this.load();
    }
    onSelect($event) {
        this.cSelect = $event['detail']['value'];
        switch ($event['detail']['value']) {
            case this.lSelect[0]:
                break;
            case this.lSelect[1]:
                break;
        }
        this.load();
    }
    load() {
        let data = {
            cFilter: this.cFilter,
            cSelect: this.cSelect
        };
        this.connApi.safePost(this.urlStatistics, data).subscribe((response) => {
            console.log("jo");
            console.log(response.body);
            console.log("joo");
            this.lData = response.body;
        }), error => {
            console.log(error);
        };
    }
    getMonth(month) {
        let lMonth = [];
        lMonth[1] = "Januar";
        lMonth[2] = "Februar";
        lMonth[3] = "März";
        lMonth[4] = "April";
        lMonth[5] = "Mai";
        lMonth[6] = "Juni";
        lMonth[7] = "Juli";
        lMonth[8] = "August";
        lMonth[9] = "September";
        lMonth[10] = "Oktober";
        lMonth[11] = "November";
        lMonth[12] = "Dezember";
        return lMonth[month];
    }
    getColumnName() {
        switch (this.cFilter) {
            case this.lFilter[0]:
                return "Jahr";
            case this.lFilter[1]:
                return "Monat";
        }
    }
};
StatisticsPage = __decorate([
    Component({
        selector: 'app-statistics',
        templateUrl: './statistics.page.html',
        styleUrls: ['./statistics.page.scss'],
    })
], StatisticsPage);
export { StatisticsPage };
//# sourceMappingURL=statistics.page.js.map