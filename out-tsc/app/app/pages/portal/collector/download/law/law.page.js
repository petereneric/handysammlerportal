import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LawPage = class LawPage {
    constructor(connApi) {
        this.connApi = connApi;
        // Urls
        this.urlLegalStatement = "collector/download/document/legal_statement";
        this.urlDataPrivacy = "collector/download/document/data_privacy";
    }
    ngOnInit() {
    }
    onLegalStatement() {
        this.connApi.safeGetPDF(this.urlLegalStatement).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
    onDataPrivacy() {
        this.connApi.safeGetPDF(this.urlDataPrivacy).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
};
LawPage = __decorate([
    Component({
        selector: 'app-law',
        templateUrl: './law.page.html',
        styleUrls: ['./law.page.scss'],
    })
], LawPage);
export { LawPage };
//# sourceMappingURL=law.page.js.map