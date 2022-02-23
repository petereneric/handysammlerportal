import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MyPage } from '../../my-page';
let AboutPage = class AboutPage extends MyPage {
    constructor(router) {
        super(router);
        this.router = router;
    }
    ngOnInit() {
    }
};
AboutPage = __decorate([
    Component({
        selector: 'app-about',
        templateUrl: './about.page.html',
        styleUrls: ['./about.page.scss'],
    })
], AboutPage);
export { AboutPage };
//# sourceMappingURL=about.page.js.map