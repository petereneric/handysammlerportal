import { __decorate } from "tslib";
import { Component } from '@angular/core';
let InformationPage = class InformationPage {
    constructor(connApi) {
        this.connApi = connApi;
        // Urls
        this.urlInformationForCollector = "download/document/informations_for_collector";
        this.urlBecomeCollector = "download/document/become_collector";
    }
    ngOnInit() {
    }
    onInformationForCollector() {
        this.connApi.getPDF(this.urlInformationForCollector).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
    onBecomeCollector() {
        this.connApi.getPDF(this.urlBecomeCollector).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
};
InformationPage = __decorate([
    Component({
        selector: 'app-information',
        templateUrl: './information.page.html',
        styleUrls: ['./information.page.scss'],
    })
], InformationPage);
export { InformationPage };
//# sourceMappingURL=information.page.js.map