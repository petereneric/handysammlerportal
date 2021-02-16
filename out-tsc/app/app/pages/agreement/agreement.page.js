import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AgreementPage = class AgreementPage {
    constructor(http, router, api) {
        this.http = http;
        this.router = router;
        this.api = api;
        // Urls
        this.urlAgreement = 'agreement';
        // Variables
        this.bTermsOfUse = null;
        this.bPrivacyPolicy = null;
        this.bSubmitted = false;
        this.bAny = false;
        this.data = null;
        this.length = 0;
    }
    ngOnInit() {
        console.log("test");
        this.api.safeGet(this.urlAgreement).subscribe((response) => {
            console.log(response);
            this.data = response.body;
            this.length = Object.keys(this.data).length;
            if (this.length > 0) {
                console.log("jo");
                this.bTermsOfUse = (this.data.termsOfUse != null) ? false : null;
                console.log(this.bTermsOfUse);
                this.bPrivacyPolicy = (this.data.privacyPolicy != null) ? false : null;
                this.bAny = (this.data.termsOfUse.bAny || this.data.privacyPolicy.bAny);
            }
            else {
                this.router.navigate(['app-root']);
            }
        }, error => {
            console.log(error);
            this.router.navigate(['app-root']);
        });
    }
    changeTermsOfUse() {
        this.bTermsOfUse = !this.bTermsOfUse;
    }
    changePrivacyPolicy() {
        this.bPrivacyPolicy = !this.bPrivacyPolicy;
    }
    onConditions() {
    }
    onPrivacyPolicy() {
    }
    isDisabled() {
        let bTermsOfUse;
        if (this.bTermsOfUse == null) {
            bTermsOfUse = false;
        }
        else {
            bTermsOfUse = this.bTermsOfUse;
        }
        let bPrivacyPolicy;
        if (this.bPrivacyPolicy == null) {
            bPrivacyPolicy = false;
        }
        else {
            bPrivacyPolicy = this.bPrivacyPolicy;
        }
        if (bTermsOfUse && bPrivacyPolicy) {
            return false;
        }
        else {
            return true;
        }
    }
    onSave() {
        // prepare
        let data = {};
    }
    getIp() {
        this.http.get("http://api.ipify.org/?format=json").subscribe((res) => {
            return res.ip;
        });
    }
};
AgreementPage = __decorate([
    Component({
        selector: 'app-agreement',
        templateUrl: './agreement.page.html',
        styleUrls: ['./agreement.page.scss'],
    })
], AgreementPage);
export { AgreementPage };
//# sourceMappingURL=agreement.page.js.map