import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { StatisticsPage } from "../statistics.page";
let ResourcesPage = class ResourcesPage extends StatisticsPage {
    constructor(connApi) {
        super(connApi);
        this.connApi = connApi;
        // Urls
        this.urlStatistics = "collector/statistics/resources";
    }
    ngOnInit() {
        this.load();
    }
    transGramm(nGramm) {
        let weight = {
            value: nGramm,
            unit: 'g'
        };
        if (weight.value / 1000 >= 1) {
            weight.value = nGramm / 1000;
            weight.unit = 'kg';
            if (weight.value / 1000 >= 1) {
                weight.value = nGramm / 1000;
                weight.unit = 'T';
            }
        }
        weight.value = parseFloat(weight.value).toFixed(2);
        return weight;
    }
    transKilogramm(nKilogramm) {
        let weight = {
            value: nKilogramm,
            unit: 'kg'
        };
        if (weight.value / 1000 >= 1) {
            weight.value = nKilogramm / 1000;
            weight.unit = 'T';
        }
        weight.value = parseFloat(weight.value).toFixed(2);
        return weight;
    }
};
ResourcesPage = __decorate([
    Component({
        selector: 'app-resources',
        templateUrl: './resources.page.html',
        styleUrls: ['./resources.page.scss'],
    })
], ResourcesPage);
export { ResourcesPage };
//# sourceMappingURL=resources.page.js.map