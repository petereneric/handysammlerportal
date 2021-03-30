import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let Downloads = class Downloads {
    constructor(Alert, Api) {
        this.Alert = Alert;
        this.Api = Api;
        // Urls
        this.urlInformationForCollector = 'download/document/informations_for_collector';
        this.urlBecomeCollector = 'download/document/become_collector';
        this.urlTermsOfUse = 'agreement/terms_of_use/';
        this.urlPrivacyPolicy = 'agreement/privacy_policy/';
    }
    informationForCollector() {
        this.Api.getFile(this.urlInformationForCollector).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.popUp('Informationen für Sammler').then(res => {
                if (!res)
                    window.open(url);
            });
        });
    }
    becomeCollector() {
        this.Api.getFile(this.urlBecomeCollector).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.popUp('Sammler werden').then(res => {
                if (!res)
                    window.open(url);
            });
        });
    }
    privacyPolicyCollector() {
        this.Api.getFile(this.urlPrivacyPolicy + 1).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.popUp('Datenschutzerklärung').then(res => {
                if (!res)
                    window.open(url);
            });
        });
    }
    termsOfUseCollector() {
        this.Api.getFile(this.urlTermsOfUse + 1).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.popUp('Nutzungsbedingungen').then(res => {
                if (!res)
                    window.open(url);
            });
        }, error => {
            console.log(error);
        });
    }
};
Downloads = __decorate([
    Injectable()
], Downloads);
export { Downloads };
//# sourceMappingURL=downloads.js.map