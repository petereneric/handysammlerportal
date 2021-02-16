import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CertificatesPage = class CertificatesPage {
    constructor(connApi) {
        this.connApi = connApi;
        // Urls
        this.urlCertificate = 'collector/download/certificate';
        this.urlYears = 'collector/download/certificate/years';
        // Variables
        this.lTime = [{ key: 'total', name: 'Gesamt' }, { key: 'year', name: 'Jahr' }];
        this.cTime = this.lTime[0];
        this.lSelectTime = [];
        this.cSelectTime = null;
    }
    ngOnInit() {
        this.connApi.safeGet(this.urlYears).subscribe((response) => {
            this.lSelectTime = response.body;
            if (this.lSelectTime.length > 0) {
                this.cSelectTime = this.lSelectTime[0];
            }
        });
    }
    onCertificate() {
        // prepare
        let data = {
            kTime: this.cTime.key,
            cSelectTime: this.cSelectTime
        };
        console.log(data);
        // send
        this.connApi.safePostPDF(this.urlCertificate, data).subscribe(response => {
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        }, error => {
            console.log(error);
        });
    }
};
CertificatesPage = __decorate([
    Component({
        selector: 'app-certificates',
        templateUrl: './certificates.page.html',
        styleUrls: ['./certificates.page.scss'],
    })
], CertificatesPage);
export { CertificatesPage };
//# sourceMappingURL=certificates.page.js.map