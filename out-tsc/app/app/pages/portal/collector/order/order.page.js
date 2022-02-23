import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MyPage } from '../../my-page';
let OrderPage = class OrderPage extends MyPage {
    constructor(router) {
        super(router);
        this.router = router;
    }
    ngOnInit() {
    }
};
OrderPage = __decorate([
    Component({
        selector: 'app-order',
        templateUrl: './order.page.html',
        styleUrls: ['./order.page.scss'],
    })
], OrderPage);
export { OrderPage };
//# sourceMappingURL=order.page.js.map