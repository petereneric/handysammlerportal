import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Downloads } from "../../../../../utilities/downloads";
import { Alert } from "../../../../../utilities/alert";
let LawPage = class LawPage {
    constructor(Alert, Downloads, connApi) {
        this.Alert = Alert;
        this.Downloads = Downloads;
        this.connApi = connApi;
        // Urls
        this.urlLegalStatement = "collector/download/document/legal_statement";
        this.urlDataPrivacy = "collector/download/document/data_privacy";
        this.urlTermsOfUse = 'agreement/terms_of_use/';
        this.urlPrivacyPolicy = 'agreement/privacy_policy/';
    }
    ngOnInit() {
    }
    onLegalStatement() {
        this.connApi.safeGetFile(this.urlLegalStatement).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.popUp('Rechtliche Grundlage').then(res => {
                if (!res)
                    window.open(url);
            });
        });
    }
    onDataPrivacy() {
        this.connApi.safeGetFile(this.urlDataPrivacy).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.popUp('Datenschutz').then(res => {
                if (!res)
                    window.open(url);
            });
        });
    }
    onPrivacyPolicy() {
        this.Downloads.privacyPolicyCollector();
    }
    onTermsOfUse() {
        this.Downloads.termsOfUseCollector();
    }
};
LawPage = __decorate([
    Component({
        selector: 'app-law',
        templateUrl: './law.page.html',
        styleUrls: ['./law.page.scss'],
        providers: [Downloads, Alert]
    })
], LawPage);
export { LawPage };
//# sourceMappingURL=law.page.js.map