import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MyPage } from '../../my-page';
let SendPage = class SendPage extends MyPage {
    constructor(router) {
        super(router);
        this.router = router;
    }
    ngOnInit() {
    }
};
SendPage = __decorate([
    Component({
        selector: 'app-send',
        templateUrl: './send.page.html',
        styleUrls: ['./send.page.scss'],
    })
], SendPage);
export { SendPage };
//# sourceMappingURL=send.page.js.map