import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ImpressumPage = class ImpressumPage {
    constructor(location) {
        this.location = location;
    }
    ngOnInit() {
    }
    onBack() {
        this.location.back();
    }
};
ImpressumPage = __decorate([
    Component({
        selector: 'app-impressum',
        templateUrl: './impressum.page.html',
        styleUrls: ['./impressum.page.scss'],
    })
], ImpressumPage);
export { ImpressumPage };
//# sourceMappingURL=impressum.page.js.map