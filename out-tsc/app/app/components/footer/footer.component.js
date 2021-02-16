import { __decorate } from "tslib";
import { Component } from '@angular/core';
let FooterComponent = class FooterComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    onImpressum() {
        this.router.navigate(['impressum']);
    }
    onMobileBox() {
        window.open('https://mobile-box.eu', "_blank");
    }
    onSecurity() {
    }
    onTermsOfUse() {
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