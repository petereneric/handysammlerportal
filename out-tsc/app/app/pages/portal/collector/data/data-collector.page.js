import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MyPage } from '../../my-page';
let DataCollectorPage = class DataCollectorPage extends MyPage {
    constructor(router) {
        super(router);
        this.router = router;
    }
    ngOnInit() {
    }
};
DataCollectorPage = __decorate([
    Component({
        selector: 'app-data-collector',
        templateUrl: './data-collector.page.html',
        styleUrls: ['./data-collector.page.scss'],
    })
], DataCollectorPage);
export { DataCollectorPage };
//# sourceMappingURL=data-collector.page.js.map