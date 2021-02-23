import { __decorate } from "tslib";
import { Component } from '@angular/core';
let FooterComponent = class FooterComponent {
    constructor(api, router) {
        this.api = api;
        this.router = router;
        this.urlTermsOfUse = 'agreement/terms_of_use/';
        this.urlPrivacyPolicy = 'agreement/privacy_policy/';
    }
    ngOnInit() {
    }
    onImpressum() {
        this.router.navigate(['impressum']);
    }
    onMobileBox() {
        window.open('https://mobile-box.eu', "_blank");
    }
    onPrivacyPolicy() {
        this.api.getPDF(this.urlPrivacyPolicy + 1).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
    onTermsOfUse() {
        this.api.getPDF(this.urlTermsOfUse + 1).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        }, error => {
            console.log(error);
        });
    }
};
FooterComponent = __decorate([
    Component({
        selector: 'app-footer',
        templateUrl: './footer.component.html',
        styleUrls: ['./footer.component.scss'],
    })
], FooterComponent);
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map