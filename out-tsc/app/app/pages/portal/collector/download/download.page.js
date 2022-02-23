import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MyPage } from '../../my-page';
let DownloadPage = class DownloadPage extends MyPage {
    constructor(router) {
        super(router);
        this.router = router;
    }
    ngOnInit() {
    }
};
DownloadPage = __decorate([
    Component({
        selector: 'app-download',
        templateUrl: './download.page.html',
        styleUrls: ['./download.page.scss'],
    })
], DownloadPage);
export { DownloadPage };
//# sourceMappingURL=download.page.js.map