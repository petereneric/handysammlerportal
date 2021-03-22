import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Downloads } from '../../../../../utilities/downloads';
let InformationPage = class InformationPage {
    constructor(connApi, Downloads) {
        this.connApi = connApi;
        this.Downloads = Downloads;
    }
    ngOnInit() {
    }
    onInformationForCollector() {
        this.Downloads.informationForCollector();
    }
    onBecomeCollector() {
        this.Downloads.becomeCollector();
    }
};
InformationPage = __decorate([
    Component({
        selector: 'app-information',
        templateUrl: './information.page.html',
        styleUrls: ['./information.page.scss'],
        providers: [Downloads]
    })
], InformationPage);
export { InformationPage };
//# sourceMappingURL=information.page.js.map