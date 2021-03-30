import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Downloads } from '../../utilities/downloads';
import { Alert } from "../../utilities/alert";
let FooterComponent = class FooterComponent {
    constructor(Downloads, api, router) {
        this.Downloads = Downloads;
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
        this.Downloads.privacyPolicyCollector();
    }
    onTermsOfUse() {
        this.Downloads.termsOfUseCollector();
    }
};
FooterComponent = __decorate([
    Component({
        selector: 'app-footer',
        templateUrl: './footer.component.html',
        styleUrls: ['./footer.component.scss'],
        providers: [Downloads, Alert]
    })
], FooterComponent);
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map