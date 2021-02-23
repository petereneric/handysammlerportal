import { __decorate } from "tslib";
import { Component } from '@angular/core';
import jwt_decode from "jwt-decode";
let AgreementPage = class AgreementPage {
    constructor(http, router, api) {
        this.http = http;
        this.router = router;
        this.api = api;
        // Urls
        this.urlAgreement = 'agreement';
        this.urlTermsOfUse = 'agreement/terms_of_use/';
        this.urlPrivacyPolicy = 'agreement/privacy_policy/';
        // Variables
        this.bTermsOfUse = null;
        this.bPrivacyPolicy = null;
        this.bSubmitted = false;
        this.bAny = false;
        this.data = null;
        this.length = 0;
    }
    ngOnInit() {
        // stakeholder
        let token = localStorage.getItem('token');
        if (token == null) {
            this.router.navigate(['app-root']);
        }
        else {
            let tokenInfo = jwt_decode(token);
            this.tStakeholder = tokenInfo['role'];
        }
        // ip
        this.http.get("http://api.ipify.org/?format=json").subscribe((res) => {
            this.ip = res.ip;
        });
        // agreements
        this.api.safeGet(this.urlAgreement).subscribe((response) => {
            this.data = response.body;
            this.length = this.data.length;
            // check for any agreement
            if (this.length > 0) {
                // check for concrete agreements
                for (let i of this.data) {
                    if (i.tAgreement == 1 && this.bTermsOfUse == null) {
                        this.bTermsOfUse = false;
                    }
                    if (i.tAgreement == 2 && this.bPrivacyPolicy == null) {
                        this.bPrivacyPolicy = false;
                    }
                }
                // check if this is the first agreement with stakeholder or an update of existing ones
                for (let i of this.data) {
                    if (i.bAny) {
                        this.bAny = true;
                    }
                }
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
        this.api.getPDF(this.urlTermsOfUse + this.tStakeholder).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        }, error => {
            console.log(error);
        });
    }
    onPrivacyPolicy() {
        this.api.getPDF(this.urlPrivacyPolicy + this.tStakeholder).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
    isDisabled() {
        let bTermsOfUse;
        if (this.bTermsOfUse == null) {
            bTermsOfUse = true;
        }
        else {
            bTermsOfUse = this.bTermsOfUse;
        }
        let bPrivacyPolicy;
        if (this.bPrivacyPolicy == null) {
            bPrivacyPolicy = true;
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
        for (let i of this.data) {
            let data = {
                cIp: this.ip,
                tAgreement: i.tAgreement,
                kAgreement: i.kAgreement
            };
            this.save(data);
        }
    }
    save(data) {
        console.log(data);
        this.api.safePut(this.urlAgreement, data).subscribe((response) => {
            console.log("jo");
            this.router.navigate(['app-root']);
        }, error => {
            console.log("no");
            console.log(error);
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